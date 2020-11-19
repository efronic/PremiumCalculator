import { Occupation } from './occupation';

export interface Premimum {
  name: string;
  age?: number | null;
  dob?: Date | null;
  occupation?: Occupation | null;
  deathCoverAmount: number;
  deathPremium: number;
}
