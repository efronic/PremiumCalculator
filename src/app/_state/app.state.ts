import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Occupation } from '../_models/occupation';
import { Premimum } from '../_models/premium';
import { Rating } from '../_models/rating';

export interface AppState {
  occupations: Occupation[];
  ratings: Rating[];
  premiums: Premimum | undefined;
  isLoading: boolean;
  error: string;
}
export const initialState: AppState = {
  occupations: [],
  ratings: [],
  premiums: undefined,
  isLoading: false,
  error: '',
};
const getState = createFeatureSelector<AppState>('premiumCalculator');
export const getOccupations = createSelector(
  getState,
  (state) => state.occupations
);
export const getRatings = createSelector(getState, (state) => state.ratings);
export const getPremiums = createSelector(getState, (state) => state.premiums);
export const getIsLoading = createSelector(
  getState,
  (state) => state.isLoading
);

export const getError = createSelector(getState, (state) => state.error);
