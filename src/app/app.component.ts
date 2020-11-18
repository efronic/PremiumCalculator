import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { takeWhile } from 'rxjs/operators';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Occupation } from './_models/occupation';
import { Rating } from './_models/rating';
import { AppService } from './_services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean> | undefined;
  premiumCalculatorForm: FormGroup | undefined;
  occupations: Occupation[] | undefined;
  ratings: Rating[] | undefined;
  formIsValid = false;
  componentActive = true;
  submitted = false;
  title = 'Premium Calculator';
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private appService: AppService
  ) {}
  ngOnInit(): void {
    this.occupations = this.appService.getOccupations();
  }
  createHCardbackForm() {
    this.premiumCalculatorForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      occupation: ['', Validators.required],
      death: ['', Validators.required],
    });
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
}
