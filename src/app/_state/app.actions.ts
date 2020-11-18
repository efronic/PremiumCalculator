import { Action } from '@ngrx/store';
import { Structure } from '../_models/structure';

export enum ActionTypes {
  Load = 'Load Structure',
  LoadSuccess = 'Load Structure Successful',
  LoadFail = 'Load Structure Fail',
}
export class Load implements Action {
  readonly type = ActionTypes.Load;
}
export class LoadSuccess implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(public payload: Structure) {}
}

export class LoadFail implements Action {
  readonly type = ActionTypes.LoadFail;
  constructor(public payload: string) {}
}

export type AppActions = LoadSuccess | Load | LoadFail;
