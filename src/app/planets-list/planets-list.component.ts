import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrl: './planets-list.component.scss'
})
export class PlanetsListComponent implements OnInit {
  planets             : any[]  = [];
  @Input() searchTerm : string = '';
  filteredPlanets     : any[]  = [];

  constructor(private http: HttpClient, private swapiService: SwapiService) { }

  ngOnInit(): void {

    // SWAPI service using HTTP GET request
    this.http.get<any>(`${this.swapiService.baseUrl}planets`).subscribe(data => {
      this.planets = data.results;
    });

    // Link the right image to the persona based on the ID
    this.planets.forEach(planet => {
      planet.imagePath = `../../assets/images/planet${this.extractPlanetId(planet.url)}.png`;
    });

    this.filterPlanets();
  }

  // This method is called whenever there are changes detected in the input properties of the component.
  // It takes an object containing the changes as an argument.
  ngOnChanges(changes: SimpleChanges): void {

    // Check if the 'searchTerm' property has changed.
    if (changes['searchTerm']) {

      // If there is a change in the 'searchTerm', call the filterPlanets() method to update the filtered list of planets.
      this.filterPlanets();

    }
  }

  // This method fetches the list of planets from the SWAPI service using HTTP GET request.
  fetchPlanets(): void {

    // Make an HTTP GET request to retrieve planet data from the SWAPI.
    this.http.get<any>(`${this.swapiService.baseUrl}planets`).subscribe(data => {

      // Once data is received, store the planet results in the 'planets' property.
      this.planets = data.results;

      // Call the filterPlanets() method to filter the list of planets based on the search term.
      this.filterPlanets();

    });
  }
  
  // Filtering the list of planets based on a search term.
  filterPlanets(): void {

    // Check if the search term is empty or whitespace.
    if (this['searchTerm'].trim() === '') {

      // If the search term is empty, assign the unfiltered list of planets to the 'filteredPlanets' property.
      this.filteredPlanets = this.planets;
      
    } else {

      // If the search term is not empty, filter the list of planets based on the search term.
      // Convert both planet name and search term to lowercase for case-insensitive comparison.
      this.filteredPlanets = this.planets.filter(planet =>
        planet.name.toLowerCase().includes(this['searchTerm'].toLowerCase())
      );

    }
  }

  private extractPlanetId(url: string): number { // Take a string url as input and return a number
    
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
