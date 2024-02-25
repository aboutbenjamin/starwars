import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'starwars';
  selectedPersona: any;

  onPersonaSelected(persona: any) {
    this.selectedPersona = persona;
  }
  
}
