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
    // Make an HTTP GET request to fetch details of the homeworld using the homeworld URL provided in the persona object
    this.http.get<any>(persona.homeworld).subscribe(data => {

      // Once the response is received, assign the fetched homeworld name, created at date, and edited at date to the persona object
      persona.homeworldName = data.name;
      persona.createdAt     = data.created;
      persona.editedAt      = data.edited;

      // Call fetchFilmDetails() to fetch details of films associated with the persona
      this.fetchFilmDetails(persona);

      // Set the selectedPersona property to the updated persona object
      this.selectedPersona = persona;

    });
  }

  fetchFilmDetails(persona: any) {
    // Initialize an empty array to store film details for the persona
    persona.filmsDetails = [];

    // Iterate through each film URL provided in the persona's films array
    persona.films.forEach((filmUrl: string) => {

      // Make an HTTP GET request to fetch details of the film using the film URL
      this.http.get<any>(filmUrl).subscribe(filmData => {
        // Once the response is received, push the film details (title and release_date) into the filmsDetails array of the persona
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