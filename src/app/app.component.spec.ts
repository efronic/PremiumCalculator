import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { Occupation } from './_models/occupation';
import { Premimum } from './_models/premium';
import { Rating } from './_models/rating';
import { getIsLoading } from './_state/app.state';

describe('AppComponent', () => {
  let component: AppComponent;
  const formBuilder: FormBuilder = new FormBuilder();
  const mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
  let loading$: Observable<boolean> = of(true);
  let store: MockStore;
  let ratings: Rating[] = [
    { ratingName: 'Professional', ratingFactor: 1.0 },
    { ratingName: 'White Collar', ratingFactor: 1.25 },
    { ratingName: 'Light Manual', ratingFactor: 1.5 },
    { ratingName: 'Heavy Manual', ratingFactor: 1.75 },
  ];
  let occupations: Occupation[] = [
    { occupationName: 'Cleaner', occupationRating: ratings[2] },
    { occupationName: 'Doctor', occupationRating: ratings[0] },
    { occupationName: 'Author', occupationRating: ratings[1] },
    { occupationName: 'Farmer', occupationRating: ratings[3] },
    { occupationName: 'Mechanic', occupationRating: ratings[3] },
    { occupationName: 'Florist', occupationRating: ratings[2] },
  ];
  let premium: Premimum = {
    name: '',
    age: null,
    dob: null,
    occupation: null,
    deathCoverAmount: 0,
    deathPremium: 0,
  };
  class FakeLoaderComponent {
    @Input() loading: boolean | undefined;
  }
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        ReactiveFormsModule,
        MatSnackBarModule,
      ],
      declarations: [AppComponent],
      providers: [
        provideMockStore(),
        { provide: FormBuilder, useValue: formBuilder },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    store.overrideSelector(getIsLoading, true);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Premium Calculator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Premium Calculator');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.loading$ = loading$;
    // pass in the form dynamically
    component.premiumCalculatorForm = formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      occupation: ['', Validators.required],
      deathCoverAmount: ['', Validators.required],
      deathPremium: ['', Validators.required],
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain(
      'Premium Calculator app is running!'
    );
  });
});
