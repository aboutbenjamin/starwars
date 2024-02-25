import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwapiService } from '../swapi.service';

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
    this.http.get<any>(`${this.swapiService.baseUrl}people`).subscribe(data => {
      this.personas = data.results;

      // Link the right image to the persona based on the ID
      this.personas.forEach(persona => {
        persona.imagePath = `../../assets/images/people${this.extractPersonaId(persona.url)}.png`;
      });

    });
  }

  // Display persona details when triggered 
  showPersonaDetails(persona: any) {
    this.personaSelected.emit(persona);
  }

  private extractPersonaId(url: string): number { // Take a string url as input and return a number
    
    // Use a regular expression to match a pattern where the url ends with {digits}
    const matches = url.match(/\/(\d+)\/$/);

    // If matches is not null and it contains at least one captured group
    if (matches && matches.length > 1) {

      // Parse the matched digits (the content of the first captured group) as an integer and return it
      return parseInt(matches[1]);
      
    }

    // If no match was found
    return 0;
  }
  
}
