import { mergeTwoTables } from '../probTableMerger';

describe('mergeTwoTables', () => {
  test('should return new table merged the two given tables', () => {
    const table1 = {
      '': { sum: 1, '': 0, 'a': 1 },
      'a': { sum: 1, '': 0, 'b': 1 },
      'b': { sum: 1, '': 0, 'c': 1 },
      'c': { sum: 1, '': 1 },
    };
    const table2 = {
      '': { sum: 2, '': 0, 'a': 2 },
      'a': { sum: 2, '': 1, 'b': 1 },
      'b': { sum: 3, '': 1, 'c': 2 },
      'c': { sum: 4, '': 1, 'd': 3 },
      'd': { sum: 1, '': 1 },
    };
    expect(mergeTwoTables(table1, table2)).toEqual({
      '': { sum: 3, '': 0, 'a': 3 },
      'a': { sum: 3, '': 1, 'b': 2 },
      'b': { sum: 4, '': 1, 'c': 3 },
      'c': { sum: 5, '': 2, 'd': 3 },
      'd': { sum: 1, '': 1 },
    });
  });

  test('should multiply the given weight first before doing merge', () => {
    const table1 = {
      '': { sum: 1, '': 0, 'a': 1 },
      'a': { sum: 1, '': 0, 'b': 1 },
      'b': { sum: 1, '': 0, 'c': 1 },
      'c': { sum: 1, '': 1 },
    };
    const table2 = {
      '': { sum: 2, '': 0, 'a': 2 },
      'a': { sum: 2, '': 1, 'b': 1 },
      'b': { sum: 3, '': 1, 'c': 2 },
      'c': { sum: 4, '': 1, 'd': 3 },
      'd': { sum: 1, '': 1 },
    };
    expect(mergeTwoTables(table1, table2, 1, 2)).toEqual({
      '': { sum: 5, '': 0, 'a': 5 },
      'a': { sum: 5, '': 2, 'b': 3 },
      'b': { sum: 7, '': 2, 'c': 5 },
      'c': { sum: 9, '': 3, 'd': 6 },
      'd': { sum: 2, '': 2 },
    });
  });
});
