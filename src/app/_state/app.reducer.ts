import { initialState, AppState } from './app.state';
import { AppActions, ActionTypes } from './app.actions';
// import { Bar } from '../_models/bar';

export function AppReducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case ActionTypes.Load:
      return {
        ...state,
        // structure: initialState.structure,
        // bars: initialState.bars,
        buttons: initialState.buttons,
        limit: initialState.limit,
        error: initialState.error,
        isLoading: true,
      };
    case ActionTypes.LoadSuccess:
      const limit = { ...action.payload }.limit;
      return {
        ...state,
        // structure: { ...action.payload },
        // bars: [
        //   ...{ ...action.payload }.bars.map((p) => {
        //     const newValue = Math.round(p * 100) / limit;

        //     const newBar: Bar = { value: p, newValue: newValue };

        //     return newBar;
        //   }),
        // ],
        buttons: { ...action.payload }.buttons,
        limit: { ...action.payload }.limit,
        isLoading: false,
      };
    case ActionTypes.LoadFail:
      return {
        ...state,
        // structure: initialState.structure,
        // bars: initialState.bars,
        buttons: initialState.buttons,
        limit: initialState.limit,
        isLoading: false,
      };

    default:
      return {
        ...state,
      };
      break;
  }
}
