# Paso 1: Imagen base con Node.js (versión 21 en Alpine)
FROM node:21-alpine3.19 AS build

# Paso 2: Establece el directorio de trabajo
WORKDIR /app

# Paso 3: Evita que Puppeteer descargue su propio Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Paso 4: Copia archivos de configuración y dependencias
COPY angular.json package.json package-lock.json ./

# Paso 5: Instala dependencias
RUN npm install

# Paso 6: Instala Chromium y dependencias del sistema
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    bash

# Paso 7: Configuración para que Puppeteer/Karma use el Chromium del sistema
ENV CHROME_BIN=/usr/bin/chromium

# Paso 8: Copia el resto del código fuente
COPY . .

# Paso 9: Ejecuta tests
RUN npm run test:docker

# Paso 10: Construye la aplicación Angular
RUN npm run build

# Paso 11: Usa Nginx para servir la aplicación
FROM nginx:alpine

# Paso 12: Copia la configuración personalizada de Nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

# Paso 13: Copia los archivos de la aplicación construida
COPY --from=build /app/dist/pokemon-ssr/browser /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 4200

# Paso 14: Ejecuta Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
