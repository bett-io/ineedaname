import { getGoodServiceNameProbs } from '../goodServiceNameProbs';

describe('getGoodServiceNameProbs', () => {
  test('should return probability table for prevLength=1', () => {
    const probs = getGoodServiceNameProbs(1);

    expect(probs['']).toBeTruthy();
    expect(probs['a']).toBeTruthy();
    expect(probs['am']).toBeUndefined();
  });

  test('should return probability table for prevLength=2', () => {
    const probs = getGoodServiceNameProbs(2);

    expect(probs['am']).toBeTruthy();
    expect(probs['a']).toBeUndefined();
  });
});
