import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwapiService } from '../service/swapi.service';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrl: './planets-list.component.scss'
})
export class PlanetsListComponent implements OnInit {
  planets             : any[]  = [];
  filteredPlanets     : any[]  = [];
  @Input() searchTerm : string = '';
  @Output() planetSelected     = new EventEmitter<any>(); 

  constructor(private http: HttpClient, private swapiService: SwapiService) { }

  ngOnInit(): void { // This method is called when the component is initialized

    // Fetching all planets
    this.fetchAllPlanets();

    // Filtering planets
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

  fetchAllPlanets(): void {
    // Calling the fetchPlanetsRecursive method with the URL for fetching planets
    this.fetchPlanetsRecursive(`${this.swapiService.baseUrl}planets`);
  }

  fetchPlanetsRecursive(url: string): void {
    // Making an HTTP GET request to fetch planets from the given URL
    this.http.get<any>(url).subscribe(data => { // When the response is received, this callback function is executed

      // Concatenating the fetched planets with the existing planets array
      this.planets = [...this.planets, ...data.results];

      // Checking if there is another page of results
      if (data.next) {

        // If another page exists, recursively fetch planets from the next page
        this.fetchPlanetsRecursive(data.next);

      } else { // If there are no more pages, perform additional operations
        
        // Linking the images of planets and filtering planets
        this.planets.forEach(planet => {
          // Constructing the image path for each planet based on its ID
          planet.imagePath = `../../assets/images/planet${this.extractPlanetId(planet.url)}.png`;
        });

        // Once all planets are fetched and images are linked, filter planets
        this.filterPlanets();

      }
    });
  }
  
  // Filtering the list of planets based on a search term.
  filterPlanets(): void {

    // Check if the search term is empty or whitespace.
    if (this.searchTerm.trim() === '') {

      // If the search term is empty, assign the unfiltered list of planets to the 'filteredPlanets' property.
      this.filteredPlanets = this.planets;
      
    } else { // If the search term is not empty, filter the list of planets based on the search term.
      
      // Convert both planet name and search term to lowercase for case-insensitive comparison.
      this.filteredPlanets = this.planets.filter(planet =>
        planet.name.toLowerCase().includes(this['searchTerm'].toLowerCase())
      );

    }
  }

  onImageError(planet: any): void { // Handle image loading error
    planet.imagePath = '../../assets/images/image.png';
  }

  private extractPlanetId(url: string): number { // This method takes a string URL as input and returns a number (presumably the ID of the planet)
    
    // Using a regular expression to match a pattern where the URL ends with digits surrounded by slashes
    const matches = url.match(/\/(\d+)\/$/);

    // If matches is not null and it contains at least one captured group
    if (matches && matches.length > 1) {
      // Parse the matched digits (the content of the first captured group) as an integer and return it
      return parseInt(matches[1]);
    }

    // If no match was found, returning 0 as a default value
    return 0;

  }
  
}
