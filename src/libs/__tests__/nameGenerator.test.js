import { generateNames } from '../nameGenerator';

describe('generateNames', () => {
  test('should return all different names of given number', () => {
    const probTable1 = {
      '': { 'sum': 1, '': 1 },
    };
    const probTable2 = {
      'xx': { 'sum': 5, 'a': 1, 'b': 1, 'c': 1, 'd': 1, 'e': 1, '': 0 },
      'xa': { 'sum': 1, '': 1 },
      'xb': { 'sum': 1, '': 1 },
      'xc': { 'sum': 1, '': 1 },
      'xd': { 'sum': 1, '': 1 },
      'xe': { 'sum': 1, '': 1 },
    };
    const names = generateNames('xx', 5, { probTable1, probTable2 });

    expect(names).toHaveLength(5);
    expect(names).toEqual(expect.arrayContaining(['xxa', 'xxb', 'xxc', 'xxd', 'xxe']));
  });
});
