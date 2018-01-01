// @flow

import defProbTable1 from '../data/probTable1';
import defProbTable2 from '../data/probTable2';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const minLen = 3;

type Probs = {
  '': ?number,
  'sum': number,
}

const probsWithTerminalWeight = (probs: Probs, terminalWeight: number) => {
  if (!probs[''] || terminalWeight === 1) return probs;

  const newTerminalCount = probs[''] * terminalWeight;
  const newSumCount = probs['sum'] + newTerminalCount - probs[''];

  return Object.assign({}, probs, { 'sum': newSumCount, '': newTerminalCount });
};

const pickNextChar = (probTable: {}, last: string, terminalWeight: number): string => {
  if (!probTable[last]) return 'noProb';

  const probs = probsWithTerminalWeight(probTable[last], terminalWeight);

  const random = Math.floor((Math.random() * probs['sum']) + 1);
  let counter = 0;

  return [...alphabet].find(c => {
    counter += (probs[c] || 0);

    return counter >= random;
  }) || '';
};

const calcTerminalWeight = (weightTable, length) => {
  if (!weightTable) return 1;

  for (let i = length; i > 0; i--) {
    if (weightTable[i]) {
      return weightTable[i];
    }
  }

  return 1;
};

export type Options = {
  probTable1: ?{},
  probTable2: ?{},
  terminalWeightTable: ?{},
}

export const generateName = (prefix: string, options: Options): string => {
  const prob1 = (options && options.probTable1) || defProbTable1;
  const prob2 = (options && options.probTable2) || defProbTable2;

  let last1 = prefix.substr(-1, 1);
  let last2 = prefix.substr(-2, 2);

  let name = prefix;
  let next = '';

  do {
    const terminalWeight = calcTerminalWeight(options.terminalWeightTable, name.length);

    const next1 = pickNextChar(prob1, last1, terminalWeight);
    const next2 = pickNextChar(prob2, last2, terminalWeight);

    next = next2 === 'noProb' ? next1 : next2;

    name += next;

    last1 = name.substr(-1, 1);
    last2 = name.substr(-2, 2);
  } while(next || name.length < minLen);

  return name;
};

export const generateNames = (prefix: string, count: number, options: Options): Array<string> => {
  let names = [];

  do {
    const newName = generateName(prefix, options);

    if (names.indexOf(newName) === -1) names.push(newName);
  } while(names.length < count);

  return names;
};
