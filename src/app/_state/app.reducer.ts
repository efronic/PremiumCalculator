import { initialState, AppState } from './app.state';
import { AppActions, ActionTypes } from './app.actions';
// import { Bar } from '../_models/bar';

export function AppReducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case ActionTypes.Load:
      return {
        ...state,
        occupations: initialState.occupations,
        ratings: initialState.ratings,
        premiums: initialState.premiums,
        error: initialState.error,
        isLoading: true,
      };
    case ActionTypes.LoadSuccess:
      return {
        ...state,

        occupations: { ...action.payload },
        isLoading: false,
      };
    case ActionTypes.LoadFail:
      return {
        ...state,

        occupations: initialState.occupations,
        isLoading: false,
      };

    default:
      return {
        ...state,
      };
      break;
  }
}
