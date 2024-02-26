import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwapiService } from '../service/swapi.service';
import { BirthYearService } from '../service/birth-year.service';

@Component({
  selector: 'app-persona-card',
  templateUrl: './persona-card.component.html',
  styleUrl: './persona-card.component.scss'
})
export class PersonaCardComponent implements OnInit {
  personas : any[]          = [];
  @Output() personaSelected = new EventEmitter<any>();

  constructor(private http: HttpClient, private swapiService: SwapiService) { }

  ngOnInit(): void {

    // Making an HTTP GET request to fetch data from the SWAPI
    this.http.get<any>(`${this.swapiService.baseUrl}people`).subscribe(data => {

      // When the response is received, this callback function is executed
      // Checking if the personas array already contains elements
      if (this.personas.length > 0) {

        // If personas array is not empty, emit an event with the first persona
        this.personaSelected.emit(this.personas[0]);

        // Setting isActive property of the first persona to true
        this.personas[0].isActive = true;

      }
      
      // Fetching all personas
      this.fetchAllPersonas();

    });
  }

  fetchAllPersonas(): void {
    // Calling the fetchPersonasRecursive method with the URL for fetching personas
    this.fetchPersonasRecursive(`${this.swapiService.baseUrl}people`);
  }

  fetchPersonasRecursive(url: string): void {

    // Making an HTTP GET request to fetch personas from the given URL
    this.http.get<any>(url).subscribe(data => {

      // When the response is received, this callback function is executed
      // Concatenating the fetched personas with the existing personas array
      this.personas = [...this.personas, ...data.results];

      if (data.next) { // Checking if there is another page of results

        // If another page exists, recursively fetch personas from the next page
        this.fetchPersonasRecursive(data.next);

      } else { // If there are no more pages, perform additional operations

        // Linking the images of personas
        this.linkPersonaImages();

        // Emitting an event with the first persona if personas array is not empty
        if (this.personas.length > 0) {
          this.personaSelected.emit(this.personas[0]);

          // Setting isActive property of the first persona to true
          this.personas[0].isActive = true;

        }
      }
    });
  }

  // Iterating through each persona in the personas array
  linkPersonaImages(): void {
    this.personas.forEach(persona => {
      // Extracting the persona ID from the URL and constructing the image path
      persona.imagePath = `../../assets/images/people${this.extractPersonaId(persona.url)}.png`;
    });
  }

  // Display persona details when triggered 
  showPersonaDetails(persona: any) {

    // Emit the selected persona
    this.personaSelected.emit(persona);

    // Deactivate all personas
    this.personas.forEach(p => p.isActive = false);
    
    // Activate the clicked persona
    persona.isActive = true;

  }

  onImageError(persona: any): void { // Handle image loading error
    persona.imagePath = '../../assets/images/avatar.png';
  }

  private extractPersonaId(url: string): number { // This method takes a string URL as input and returns a number (presumably the ID of the persona)
    
    // Using a regular expression to match a pattern where the URL ends with {digits}
    const matches = url.match(/\/(\d+)\/$/);

    // If matches is not null and it contains at least one captured group
    if (matches && matches.length > 1) {

      // Parsing the matched digits (the content of the first captured group) as an integer and returning it
      return parseInt(matches[1]);
      
    }

    // If no match was found, returning 0 as a default value
    return 0;
  }
  
}
