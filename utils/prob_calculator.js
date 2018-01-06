const readline = require('readline');

import { addNewWordToProbTable } from '../src/libs/probCalculator';

const prevLength = parseInt(process.argv[2]) || 1;

let probs = {};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on('line', line => processLine(line));

rl.on('close', () => {
  console.log(probs);
});

const processLine = (line) => {
  try {
    probs = addNewWordToProbTable(probs, prevLength, line.toLowerCase());
  } catch (e) {
    return true;
  }
};
