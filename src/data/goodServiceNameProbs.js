// @flow

import nameList from './goodServiceNames';
import { addNewWordToProbTable } from '../libs/probCalculator';

// FIXME name list should be fetched from database and cached in memory.
let cache1;
let cache2;

const calcProbs = (names: Array<string>, prevLength: number): {} => names.reduce(
  (probs, name) => addNewWordToProbTable(probs, prevLength, name),
  {},
);

export const getGoodServiceNameProbs = (prevLength: number): {} => {
  if (!cache1) cache1 = calcProbs(nameList, 1);
  if (!cache2) cache2 = calcProbs(nameList, 2);

  return prevLength === 1 ? cache1 : cache2;
};
