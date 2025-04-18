

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError,throwError } from 'rxjs';
import { Pokemon, PokeResponse, SimplePokemon } from '../interfaces';

@Injectable({providedIn: 'root'})
export class PokemonService {

  private http = inject(HttpClient);

  loadPage(page : number) : Observable<SimplePokemon[]> {

    if(page !==0) --page;

    page = Math.max(0, page);

    return this.http.get<PokeResponse>(
      `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`)
      .pipe(
        map( (response) => {

          const simplePokemon : SimplePokemon[] = response.results.map((pokemon) => ({
            id : pokemon.url.split('/').at(-2) ?? '',
            name : pokemon.name,
          }));
          return simplePokemon;

        })
      )
  }


  loadPokemon(id: string) {
    return this.http
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occurred:', error.error);
    } else {
      console.log(`Backend returned code ${error.status}, body:`, error.error);
    }

    const errorMessage = error.error ?? 'An error occurred';

    return throwError(() => new Error(errorMessage));
  }

}
