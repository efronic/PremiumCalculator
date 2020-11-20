import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { takeWhile } from 'rxjs/operators';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Occupation } from './_models/occupation';
import { Rating } from './_models/rating';
import { AppService } from './_services/app.service';
import { Premimum } from './_models/premium';
import { MatSelectChange } from '@angular/material/select';
import * as fromAppState from './_state/app.state';
import * as fromAppActions from './_state/app.actions';
import { isNullorUndefined } from './_shared/helpers';

function isIntegerValidator() {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && control.value % 1 !== 0)
      return { isIntegerValidator: true };

    return null;
  };
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loading$!: Observable<boolean> | undefined;
  maxDate: Date | undefined;
  premiumCalculatorForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    age: [
      '',
      [
        Validators.required,
        Validators.min(1),
        Validators.max(120),
        isIntegerValidator(),
      ],
    ],
    dob: ['', [Validators.required]],
    occupation: ['', Validators.required],
    deathCoverAmount: ['', [Validators.required, Validators.min(0)]],
    deathPremium: ['', Validators.required],
  });
  occupations: Occupation[] | undefined;
  ratings: Rating[] | undefined;
  premium!: Premimum;
  formIsValid = false;
  componentActive = true;
  submitted = false;
  title = 'Premium Calculator';
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private appService: AppService,
    private store: Store<fromAppState.AppState>
  ) {
    const currentYear = new Date();
    this.maxDate = currentYear;
  }
  ngOnInit(): void {
    this.occupations = this.appService.getOccupations();
    this.loading$ = this.store.pipe(
      select(fromAppState.getIsLoading),
      takeWhile(() => this.componentActive)
    );

    this.formControlValueChanged();
  }

  formControlValueChanged() {
    let selectedOccupation = this.premiumCalculatorForm.get('occupation')!;
    let selectedDeathCoverAmount = this.premiumCalculatorForm.get(
      'deathCoverAmount'
    )!;
    let selectedAge = this.premiumCalculatorForm.get('age')!;
    let dob = this.premiumCalculatorForm.get('dob')!;

    selectedDeathCoverAmount.valueChanges
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((mode: number) => {
        if (
          selectedOccupation.value &&
          selectedAge.value &&
          selectedDeathCoverAmount.value
        ) {
          this.premiumCalculatorForm.patchValue({
            deathPremium: (
              ((selectedDeathCoverAmount.value *
                selectedOccupation.value *
                selectedAge.value) /
                1000) *
              12
            ).toFixed(2),
          });
        }
      });
    selectedAge.valueChanges
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((mode: number) => {
        if (
          selectedOccupation.value &&
          selectedAge.value &&
          selectedDeathCoverAmount.value
        ) {
          this.premiumCalculatorForm.patchValue({
            deathPremium: (
              ((selectedDeathCoverAmount.value *
                selectedOccupation.value *
                selectedAge.value) /
                1000) *
              12
            ).toFixed(2),
          });
        }
      });
    selectedOccupation.valueChanges
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((mode: Occupation) => {
        if (
          selectedOccupation.value &&
          selectedAge.value &&
          selectedDeathCoverAmount.value
        ) {
          this.premiumCalculatorForm.patchValue({
            deathPremium: (
              ((selectedDeathCoverAmount.value *
                selectedOccupation.value *
                selectedAge.value) /
                1000) *
              12
            ).toFixed(2),
          });
        }
      });
    dob.valueChanges
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((mode: Date) => {
        console.log('dob changed');

        if (mode)
          this.premiumCalculatorForm.patchValue({
            age: this.appService.CalculateAge(mode),
          });
      });
  }

  submit() {
    this.submitted = true;
    if (this.premiumCalculatorForm.valid) {
      this.formIsValid = true;
      this.premium = Object.assign({}, this.premiumCalculatorForm.value);
      console.log('premium is submitted! ', this.premium);
      this.store.dispatch(new fromAppActions.Submit(this.premium));
      this.openSnackBar(
        'Your premium information is successfully submitted. (Please look at the console menu) Thank you!',
        'Ok'
      );
    } else {
      this.formIsValid = false;
      this.openSnackBar('Please enter all the required fields properly!', 'Ok');
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
