import defProbTable1 from '../data/probTable1';
import defProbTable2 from '../data/probTable2';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const pickNextChar = (probTable, last) => {
  if (!probTable[last]) return false;

  const random = Math.floor((Math.random() * probTable[last]['sum']) + 1);
  let counter = 0;

  return [...alphabet].find(c => {
    counter += (probTable[last][c] || 0);

    return counter >= random;
  }) || '';
};

export const generateName = (prefix, probTable1, probTable2) => {
  const prob1 = probTable1 || defProbTable1;
  const prob2 = probTable2 || defProbTable2;

  let last1 = prefix.substr(-1, 1);
  let last2 = prefix.substr(-2, 2);

  let name = prefix;
  let next = '';

  do {
    const next1 = pickNextChar(prob1, last1);
    const next2 = pickNextChar(prob2, last2);

    next = next2 === false ? next1 : next2;

    name += next;

    last1 = next;
    last2 = last2[1] + next;
  } while(next);

  return name;
};

export const generateNames = (prefix, count, probTable1, probTable2) => {
  let names = [];

  do {
    const newName = generateName(prefix, probTable1, probTable2);

    if (names.indexOf(newName) === -1) names.push(newName);
  } while(names.length < count);

  return names;
};
