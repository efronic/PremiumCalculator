# PremiumCalculator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.


As a Member I would like to have an ability to choose various options on the screen  So that I can view the monthly premiums calculated and displayed on the screen. There is a UI which accepts the below data and return a monthly premium amount to be calculated.

Name
Age
Date of Birth
Occupation
Death – Sum Insured.
 

The UI provides a below list of occupations

Occupation

Occupation

Rating

Cleaner

Light Manual

Doctor

Professional

Author

White Collar

Farmer

Heavy Manual

Mechanic

Heavy Manual

Florist

Light Manual

 
There is a factor associated with each rating as below,


Professional

1.0

White Collar

1.25

Light Manual

1.50

Heavy Manual

1.75

For any given individual the monthly premium is calculated using the below formula
Death Premium = (Death Cover amount * Occupation Rating Factor * Age) /1000 * 12

All input fields are mandatory.
Given all the input fields are specified, change in the occupation dropdown should trigger the premium calculation

## Prerequisites

Install the latest version of Node from [here](https://nodejs.org/).

Run npm install -g @angular/cli to install/update the latest version of Angular CLI.

Once you have downloaded the codebase, run npm install to install all the dependencies and node modules.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
