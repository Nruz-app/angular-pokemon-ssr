import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons',
    loadComponent: () => import('@pages/pokemons/pokemons.component'),
  },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('@pages/pokemons/pokemons.component'),
  },
  {
    path: 'pokemons/:id',
    loadComponent: () => import('@pages/pokemon/pokemon-page/pokemon-page.component'),
  },
  {
    path: 'about',
    loadComponent: () => import('@pages/about-page/about-page.component')
  },
  {
    path: 'pricing',
    loadComponent: () => import('@pages/pricing-page/pricing-page.component')
  },
  {
    path: 'contact',
    loadComponent: () => import('@pages/contact-page/contact-page.component')
  },
  {
    path: '**',
    redirectTo: () => {

      //Se puede llamar a un servicio para agregar alguna logica (autenticacion)
      //const authService = inject(AuthService);

       return 'pokemons';
    }
  }
];
