import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

import { Pokemon } from '../models/pokemon';
import { PokemonId } from '../models/pokemon-id';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  pokeApi: any;

  constructor(private httpClient : HttpClient) {
    this.pokeApi = environment.pokemonUrl;
  }

  /**
   * Method that fetches data from
   * the Pokémon API.
   */
  getPokemon(): Observable<Pokemon[]> {
    return this.httpClient.get<Pokemon[]>(`${this.pokeApi}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getPokemonId(id): Observable<PokemonId>{
    return this.httpClient.get<PokemonId>(`${this.pokeApi}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent){
      console.error('An error occurred', error.error.message);
    }else{
      console.error(`Backend returned code ${error.status},`+
      `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please trty again later,'
    );
  }
}
