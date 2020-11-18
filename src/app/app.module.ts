import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './_shared/loader/loader.component';
import { AppEffects } from './_state/app.effects';
import { AppReducer } from './_state/app.reducer';
import { MaterialModule } from './_shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,

    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forFeature('premiumCalculator', AppReducer),
    // EffectsModule.forFeature([AppEffects]),
    StoreDevtoolsModule.instrument({
      name: 'ProgressBar DevTools',
      maxAge: 50,
      logOnly: environment.production,
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'en-AU' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
