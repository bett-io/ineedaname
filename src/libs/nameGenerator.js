import probTable1 from '../data/probTable1';
import probTable2 from '../data/probTable2';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const pickNextChar = (probTable, last) => {
  if (!probTable[last]) return false;

  const random = Math.floor((Math.random() * probTable[last]['sum']) + 1);
  let counter = 0;

  return [...alphabet].find(c => {
    counter += (probTable[last][c] || 0);

    return counter > random;
  }) || '';
};

export const generateName = prefix => {
  let last1 = prefix.substr(-1, 1);
  let last2 = prefix.substr(-2, 2);

  let name = prefix;
  let next = '';

  do {
    const next1 = pickNextChar(probTable1, last1);
    const next2 = pickNextChar(probTable2, last2);

    next = next2 === false ? next1 : next2;

    name += next;

    last1 = next;
    last2 = last2[1] + next;
  } while(next);

  return name;
};
