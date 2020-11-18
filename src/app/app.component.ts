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
import { Premimum } from './_models/premium';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean> | undefined;
  premiumCalculatorForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
    dob: ['', Validators.required],
    occupation: ['', Validators.required],
    deathCoverAmount: ['', Validators.required],
    deathPremium: ['', Validators.required],
  });
  occupations: Occupation[] | undefined;
  ratings: Rating[] | undefined;
  premium: Premimum | undefined;
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

  formControlValueChanged() {
    let selectedOccupation = this.premiumCalculatorForm.get('occupation')!;
    let selectedDeathCoverAmount = this.premiumCalculatorForm.get(
      'deathCoverAmount'
    )!;
    let selectedAge = this.premiumCalculatorForm.get('age')!;
    if (
      selectedOccupation != null &&
      selectedDeathCoverAmount != null &&
      selectedAge != null
    ) {
      selectedOccupation.valueChanges
        .pipe(takeWhile(() => this.componentActive))
        .subscribe((mode: Occupation) => {
          console.log('selectedOccupation changed mode', mode);

          this.premiumCalculatorForm.patchValue({
            deathPremium:
              ((+selectedDeathCoverAmount *
                +selectedOccupation *
                +selectedAge) /
                1000) *
              12,
          });
        });
    }
  }
  submit() {
    this.submitted = true;
    if (this.premiumCalculatorForm.valid) {
      this.formIsValid = true;
      console.log('premium is submitted! ', this.premium);

      this.openSnackBar(
        'Your premium information is successfully submitted. Thank you!',
        'Ok'
      );
    } else {
      this.formIsValid = false;
      this.openSnackBar('Please enter all the required fields!', 'Ok');
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
}
