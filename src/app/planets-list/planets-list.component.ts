import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrl: './planets-list.component.scss'
})
export class PlanetsListComponent implements OnInit {
  planets: any[] = [];

  constructor(private http: HttpClient, private swapiService: SwapiService) { }

  ngOnInit(): void {
    this.http.get<any>(`${this.swapiService.baseUrl}planets`).subscribe(data => {
      this.planets = data.results;
    });

    // Link the right image to the persona based on the ID
    this.planets.forEach(planet => {
      planet.imagePath = `../../assets/images/planet${this.extractPlanetId(planet.url)}.png`;
    });
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
