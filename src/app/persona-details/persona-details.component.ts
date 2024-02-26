import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BirthYearService } from '../service/birth-year.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-persona-details',
  templateUrl: './persona-details.component.html',
  styleUrl: './persona-details.component.scss'
})
export class PersonaDetailsComponent implements OnInit {
  @Input() persona : any;
  homeworldName    : string = '';
  createdAt        : string = '';
  editedAt         : string = '';

  constructor(private http: HttpClient, private birthYearService: BirthYearService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void { // This method is called when the component is initialized
    this.fetchDetails();
  }

  fetchDetails() {
    // Make an HTTP GET request to fetch details of the persona
    this.http.get<any>(this.persona.url).subscribe(data => {

      // Assign the fetched homeworld name to the component property
      this.homeworldName = data.homeworldName;

      // Assign the fetched created at date to the component property
      this.createdAt     = data.createdAt;

      // Assign the fetched edited at date to the component property
      this.editedAt      = data.editedAt;

      // Call fetchFilmDetails() to fetch details of films associated with the persona
      this.fetchFilmDetails(data.films);

    });
  }

  fetchFilmDetails(filmUrls: string[]) {
    // Initialize an empty array to store film details for the persona
    this.persona.filmsDetails = [];

    // Iterate through each film URL provided in the filmUrls array
    filmUrls.forEach((filmUrl: string) => {

      // Make an HTTP GET request to fetch details of the film using the film URL
      this.http.get<any>(filmUrl).subscribe(filmData => {

        // Once the response is received, push the film details (title and release_date) into the filmsDetails array
        this.persona.filmsDetails.push({
          title       : filmData.title,
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

  // Open error snackbar when button is triggered
  openErrorSnackbar() {
    this._snackBar.open('Error message', 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'end', // Positioning
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-warn'] // Custom styling
    });
  }

}
