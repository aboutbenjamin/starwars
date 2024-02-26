import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm: string = '';
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  onSearchChange(): void {
    // Emitting an event with the current search term using the EventEmitter 'searchChange'
    this.searchChange.emit(this.searchTerm);
  }
  
}
