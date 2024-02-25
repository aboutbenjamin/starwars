import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-persona-details',
  templateUrl: './persona-details.component.html',
  styleUrl: './persona-details.component.scss'
})
export class PersonaDetailsComponent {
  @Input() persona: any;

  constructor() { }
}
