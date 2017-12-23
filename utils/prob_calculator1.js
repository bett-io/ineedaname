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
  if (!probs[prev]) probs[prev] = { sum: 0, '': 0 };
  if (!probs[prev][next]) probs[prev][next] = 0;

  probs[prev][next]++;
  probs[prev]['sum']++;

  return probs;
};

const processLine = (line) => {
  const lline = line.toLowerCase();

  let prev = '';

  [...lline].forEach(c => {
    if (c < 'a' || c > 'z') return;

    probs = count(probs, prev, c);

    prev = c;
  });

  probs = count(probs, prev, '');
};
