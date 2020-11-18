import { Action } from '@ngrx/store';
import { Occupation } from '../_models/occupation';
import { Premimum } from '../_models/premium';

export enum ActionTypes {
  Load = 'Load Occupations',
  LoadSuccess = 'Load Occupations Successful',
  LoadFail = 'Load Occupations Fail',
  Submit = 'Submit Premium'
}
export class Load implements Action {
  readonly type = ActionTypes.Load;
}
export class LoadSuccess implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(public payload: Occupation[]) {}
}

export class LoadFail implements Action {
  readonly type = ActionTypes.LoadFail;
  constructor(public payload: string) {}
}
export class Submit implements Action {
  readonly type = ActionTypes.Submit;
  constructor(public payload: Premimum) {}
}
export type AppActions = LoadSuccess | Load | LoadFail | Submit;
