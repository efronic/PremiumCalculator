import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppService } from '../_services/app.service';
import * as appActions from './app.actions';
import { Occupation } from '../_models/occupation';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private appService: AppService) {}

  // this would be used if there was a backend api
  @Effect()
  load$ = this.actions$.pipe(
    ofType(appActions.ActionTypes.Load),
    mergeMap((action: appActions.Load) =>
      this.appService.getOccupationsFromAPI().pipe(
        map(
          (occupations: Occupation[]) => new appActions.LoadSuccess(occupations)
        ),
        catchError((err: string) => of(new appActions.LoadFail(err)))
      )
    )
  );
}
