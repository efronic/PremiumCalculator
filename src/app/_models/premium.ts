import { Occupation } from './occupation';

export interface Premimum {
  name: string;
  age: number;
  dob: Date;
  occupation: Occupation;
  deathCoverAmount: number;
  deathPremium: number;
}
