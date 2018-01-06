// @flow

const count = (probs: {}, prev: string, next: string): {} => {
  const newProbs = probs;

  if (!newProbs[prev]) newProbs[prev] = { sum: 0, '': 0 };
  if (!newProbs[prev][next]) newProbs[prev][next] = 0;

  newProbs[prev][next]++;
  newProbs[prev]['sum']++;

  return newProbs;
};

export const addNewWordToProbTable = (currentProbTable: {}, prevLength: number, word: string)
: {} => {
  let newProbs = currentProbTable;
  let prev = '';

  [...word].forEach((ch) => {
    if (ch < 'a' || ch > 'z') throw 'unrecognised letter';

    if (prev === '' || prev.length === prevLength) newProbs = count(newProbs, prev, ch);

    prev += ch;
    prev = prev.substr(prevLength * -1, prevLength); // Cut last {prevLength} letters.
  });

  return count(newProbs, prev, '');
};
