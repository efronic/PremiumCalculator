import { Action } from '@ngrx/store';
import { Occupation } from '../_models/occupation';

export enum ActionTypes {
  Load = 'Load Occupations',
  LoadSuccess = 'Load Occupations Successful',
  LoadFail = 'Load Occupations Fail',
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

export type AppActions = LoadSuccess | Load | LoadFail;
