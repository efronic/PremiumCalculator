import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';
import { EMPTY, Observable } from 'rxjs';
import { Occupation } from '../_models/occupation';
import { Rating } from '../_models/rating';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl = environment.apiUrl;
  occupations: Occupation[] | undefined;
  ratings: Rating[] = [
    { ratingName: 'Professional', ratingFactor: 1.0 },
    { ratingName: 'White Collar', ratingFactor: 1.25 },
    { ratingName: 'Light Manual', ratingFactor: 1.5 },
    { ratingName: 'Heavy Manual', ratingFactor: 1.75 },
  ];

  constructor() {}

  getOccupations(): Occupation[] {
    return [
      { occupationName: 'Cleaner', occupationRating: this.ratings[2] },
      { occupationName: 'Doctor', occupationRating: this.ratings[0] },
      { occupationName: 'Author', occupationRating: this.ratings[1] },
      { occupationName: 'Farmer', occupationRating: this.ratings[3] },
      { occupationName: 'Mechanic', occupationRating: this.ratings[3] },
      { occupationName: 'Florist', occupationRating: this.ratings[2] },
    ];
  }
  getOccupationsFromAPI(): Observable<Occupation[]> {
    return EMPTY;
  }
}
