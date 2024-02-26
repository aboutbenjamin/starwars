import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BirthYearService {

  constructor() { }

  extractDigits(birthYear: string): string {
    // Using the replace method with a regular expression to remove all non-digit characters from the birthYear string
    return birthYear.replace(/\D/g, '');
  }
}