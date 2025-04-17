import { Pokemon } from '@/pokemons/interfaces';
import { PokemonService } from '@/pokemons/services/pokemon.service';
import { Component, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css'
})
export default class PokemonPageComponent {

  private readonly pokemonService = inject(PokemonService);
  private readonly router = inject(ActivatedRoute);

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit() : void {

    const id = this.router.snapshot.paramMap.get('id') ?? '';
    if(!id) return;

    this.pokemonService
      .loadPokemon(id)
      .pipe(
        tap(({ name, id }) => {

          const pageTitle = `#${id} - ${name}`;
          const pageDescription = `Página del Pokémon ${name}`;
          this.title.setTitle(pageTitle);

          this.meta.updateTag({
            name: 'description',
            content: pageDescription,
          });

          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({
            name: 'og:description',
            content: pageDescription,
          });

          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });

      }))
      .subscribe(this.pokemon.set);
  }



}
