### Link Paquetes del Projectos

### Documentacion Taiwind

[Guía Tailwind con Angular](https://tailwindcss.com/docs/installation/framework-guides/angular)


## Comando de Angular para agrgear SSR (Server Side Rendering)

[Angular SSR](https://angular.dev/guide/ssr)

```
ng add @angular/ssr
```
## Documentacion SSR (Static Site Generation)

[Angular SSG](https://angular.dev/guide/prerendering)

## Agregar la siguiente linea en angular.json
```
"prerender" : { "routesFile": "routes.txt" }
```
## Remover la siguiente linea en angular.json
```
"outputMode": "server",
```

## Crear Script para realizar archivo router prerender(router.txt) de Forma Automatica
```
/scripts/prerener-router.js
```
## Editar comando Build
```
"build": "npm run prerender:routes && ng build",
"prerender:routes": "node scripts/prerender-routes.js"
```
            
## Doc Test Http Service
[Angular Test Service](https://angular.dev/guide/testing/services#testing-http-services)

## Doc Test Request
[Angular Testing](https://angular.dev/guide/http/testing)


## Doc Test Esperando y Respondiendo Request
[Angular Testing](https://angular.dev/guide/http/testing#expecting-and-answering-requests)

# Comando limpiar docker
``` 
docker-compose down
docker system prune -a --volumes -f
```
# Comando Para countruir la imagen local y prod
``` 
docker-compose build
docker-compose -f docker-compose.prod.yml build
```
# Comado para levantar imagen local y prod
```
docker-compose up -d
docker-compose -f docker-compose.prod.yml up -d
```
# Comado para subir imagen al repositorio de google cloud (GCP)
```
gcloud auth configure-docker us-central1-docker.pkg.dev
docker image push us-central1-docker.pkg.dev/teslo-shop-backend/teslo-shop-app/teslo-shop-backend
```

# Github Pages 

[View Teslo Shop Angular](https://nruz-app.github.io/angular-teslo-shop/#/)
