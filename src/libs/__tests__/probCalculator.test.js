import { addNewWordToProbTable } from '../probCalculator';

describe('addNewWordToProbTable', () => {
  test('should create new probTable from the given word', () => {
    expect(addNewWordToProbTable({}, 1, 'abc')).toEqual({
      '': { sum: 1, '': 0, 'a': 1 },
      'a': { sum: 1, '': 0, 'b': 1 },
      'b': { sum: 1, '': 0, 'c': 1 },
      'c': { sum: 1, '': 0, '': 1 },
    });
  });

  test('should add new probs into the current one', () => {
    expect(addNewWordToProbTable({
      'a': { sum: 3, '': 0, 'x': 3 },
      'v': { sum: 2, '2': 0 },
    }, 1, 'abc')).toEqual({
      '': { sum: 1, '': 0, 'a': 1 },
      'a': { sum: 4, '': 0, 'b': 1, 'x': 3 },
      'b': { sum: 1, '': 0, 'c': 1 },
      'c': { sum: 1, '': 0, '': 1 },
      'v': { sum: 2, '2': 0 },
    });
  });

  test('should create new two letter probTable from the given word', () => {
    expect(addNewWordToProbTable({}, 2, 'aabcd')).toEqual({
      '': { sum: 1, '': 0, 'a': 1 },
      'aa': { sum: 1, '': 0, 'b': 1 },
      'ab': { sum: 1, '': 0, 'c': 1 },
      'bc': { sum: 1, '': 0, 'd': 1 },
      'cd': { sum: 1, '': 0, '': 1 },
    });
  });
});
