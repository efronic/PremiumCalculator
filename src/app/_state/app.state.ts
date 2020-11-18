import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Structure } from '../_models/structure';

export interface AppState {
  // structure: Structure;
  buttons: number[];
  limit: number;
  isLoading: boolean;
  error: string;
}
export const initialState: AppState = {
  buttons: [],
  // bars: [],
  limit: 0,
  isLoading: false,
  error: '',
};
const getState = createFeatureSelector<AppState>('progressBar');
export const getButtons = createSelector(getState, (state) => state.buttons);
// export const getStructure = createSelector(
//   getState,
//   (state) => state.structure
// );

// export const getBars = createSelector(getState, (state) => state.bars);
export const getLimit = createSelector(getState, (state) => state.limit);
export const getIsLoading = createSelector(
  getState,
  (state) => state.isLoading
);

export const getError = createSelector(getState, (state) => state.error);
