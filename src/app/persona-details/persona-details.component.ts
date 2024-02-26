import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BirthYearService } from '../service/birth-year.service';

@Component({
  selector: 'app-persona-details',
  templateUrl: './persona-details.component.html',
  styleUrl: './persona-details.component.scss'
})
export class PersonaDetailsComponent implements OnInit {
  @Input() persona: any;
  @Input() homeworldName: string = '';

  constructor(private http: HttpClient, private birthYearService: BirthYearService) { }

  ngOnInit(): void { // This method is called when the component is initialized

    // Fetching the homeworld details
    this.fetchHomeworld();

    // Fetching film details
    this.fetchFilmDetails();

  }

  fetchHomeworld() {
    // Making an HTTP GET request to fetch homeworld details using the persona's homeworld URL
    this.http.get<any>(this.persona.homeworld).subscribe(data => { // When the response is received, this callback function is executed
      
      // Extracting the homeworld name from the response data and assigning it to the homeworldName property
      this.homeworldName = data.name;

    });
  }

  fetchFilmDetails() {
    // Initializing an empty array to store film details for the persona
    this.persona.filmsDetails = [];

    // Iterating through each film URL in the persona's films array
    this.persona.films.forEach((filmUrl: string) => {

      // Making an HTTP GET request to fetch details about each film
      this.http.get<any>(filmUrl).subscribe(filmData => { // When the response is received, this callback function is executed
        
        // Extracting relevant details from the filmData and pushing it into the filmsDetails array
        this.persona.filmsDetails.push({
          title: filmData.title,
          release_date: filmData.release_date
        });

      });
    });
  }

  extractDigits(birthYear: string): string {
    // Calling a method named extractDigits from the birthYearService service and passing the birthYear string as an argument
    return this.birthYearService.extractDigits(birthYear);
  }

  handleImageError(event: any, persona: any) {
    // Set the source of the image element to a default image (avatar.png) when an error occurs
    event.target.src = '../../assets/images/avatar.png';
  }

}
