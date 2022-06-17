import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient){ }


  getCharacters(id:number){
      return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${id}`)
      
  }
}
