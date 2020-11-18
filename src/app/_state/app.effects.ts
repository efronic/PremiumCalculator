
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppService } from '../_services/app.service';
import { Structure } from '../_models/structure';
import * as appActions from './app.actions';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private appService: AppService) {}
  @Effect()
  load$ = this.actions$.pipe(
    ofType(appActions.ActionTypes.Load),
    mergeMap((action: appActions.Load) =>
      this.appService.getStructure().pipe(
        map((structure: Structure) => new appActions.LoadSuccess(structure)),
        catchError((err: string) => of(new appActions.LoadFail(err)))
      )
    )
  );
}
