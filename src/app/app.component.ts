import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { takeWhile } from 'rxjs/operators';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Occupation } from './_models/occupation';
import { Rating } from './_models/rating';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading$: Observable<boolean> | undefined;
  premiumCalculatorForm: FormGroup | undefined;
  occupations: Occupation[] | undefined;
  ratings: Rating[] | undefined;
  formIsValid = false;
  componentActive = true;
  submitted = false;
  title = 'Premium Calculator';
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}
  createHCardbackForm() {
    this.premiumCalculatorForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      occupation: ['', Validators.required],
      death: ['', Validators.required],
    });
  }
}
