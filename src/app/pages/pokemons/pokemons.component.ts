import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { PokemonListSkeletonComponent } from '@/pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonListComponent } from '@/pokemons/components/pokemon-list/pokemon-list.component';
import { SimplePokemon } from '@/pokemons/interfaces';
import { PokemonService } from '@/pokemons/services/pokemon.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-pokemons',
  imports: [PokemonListComponent,PokemonListSkeletonComponent,RouterLink],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent  { //implements OnInit

  private readonly pokemonService = inject(PokemonService);
  pokemons = signal<SimplePokemon[]>([]);

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private title = inject(Title);

  currentPage = toSignal(
      this.route.params.pipe(
        map((params) => params['page'] ?? '1'),
        map((page) => (isNaN(+page) ? 1 : +page)),
        map((page) => Math.max(1, page)),
      )
  );
  /************************
  ngOnInit(): void {
    this.loadPokemon();
  }
  *************************/
  //Efecto que ejecuta cuando cambia la pagina
  loadOnPageChanged = effect(() => {
    const pageToLoad = this.currentPage()!;
    this.loadPokemon(pageToLoad);
    //console.log({pageToLoad});
  },
  { allowSignalWrites: true });


  loadPokemon(nextPage = 0) {


    this.pokemonService.loadPage(nextPage)
      .pipe(
        //tap( ()=> this.router.navigate([],{ queryParams : { page : pageToLoad }})),
        tap(() => this.title.setTitle(`Pokémons SSR - Page ${nextPage}`))
      )
      .subscribe((pokemon) => {
        this.pokemons.set(pokemon);
    });

  }



  /******* ApplicationRef - STABLE (saber si page es estable) ***************
  public isLoading = signal(true);
  private appRef = inject(ApplicationRef);

  private $appState = this.appRef.isStable.subscribe((isStable : any) => {
     console.log({ isStable });
  });
  gOnInit(): void {
     setTimeout(() => {
       this.isLoading.set(false);
     }, 5000);
  }
  ngOnDestroy(): void {
     this.$appState.unsubscribe();
  }
  *************************************************************************************/

}
