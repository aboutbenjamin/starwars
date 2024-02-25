import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'starwars';
  selectedPersona : any;
  searchTerm      : string = '';

  onPersonaSelected(persona: any) {
    this.selectedPersona = persona;
  }

  onPlanetSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
  }
  
}