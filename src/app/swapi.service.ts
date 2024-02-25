import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  baseUrl = 'https://swapi.dev/api/';

  constructor() { }
}
