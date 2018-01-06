const readline = require('readline');

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

const count = (probs, prev, next) => {
  const newProbs = probs;

  if (!newProbs[prev]) newProbs[prev] = { sum: 0, '': 0 };
  if (!newProbs[prev][next]) newProbs[prev][next] = 0;

  newProbs[prev][next]++;
  newProbs[prev]['sum']++;

  return newProbs;
};

const processLine = (line) => {
  const lline = line.toLowerCase();

  let prev = '';

  [...lline].forEach((c) => {
    if (c < 'a' || c > 'z') return;

    probs = count(probs, prev, c);

    prev = c;
  });

  probs = count(probs, prev, '');
};
