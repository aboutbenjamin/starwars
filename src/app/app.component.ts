import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'starwars';
  selectedPersona : any;
  searchTerm      : string = '';

  constructor(private http: HttpClient) {}

  onPersonaSelected(persona: any) {
    // Making an HTTP GET request to fetch details about the homeworld of the selected persona
    this.http.get<any>(persona.homeworld).subscribe(data => {  // When the response is received, this callback function is execut
      
      // Assigning the homeworld name from the response data to the persona object
      persona.homeworldName = data.name;

      // Fetching film details related to the persona
      this.fetchFilmDetails(persona);

      // Setting the selected persona
      this.selectedPersona = persona;

    });
  }

  fetchFilmDetails(persona: any) {
    // Initialize an empty filmsDetails array for the given persona
    persona.filmsDetails = [];

    // Iterate through each film URL in the persona's films array
    persona.films.forEach((filmUrl: string) => {

      // Make an HTTP GET request to fetch details about each film
      this.http.get<any>(filmUrl).subscribe(filmData => {

        // When the response is received, push the film details (title and release_date) into the filmsDetails array
        persona.filmsDetails.push({
          title: filmData.title,
          release_date: filmData.release_date
        });

      });

    });

  }

  onPlanetSearch(searchTerm: string) {
    // Update the searchTerm property with the provided search term
    this.searchTerm = searchTerm;
  }
  
}