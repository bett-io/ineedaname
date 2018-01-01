import { generateName, generateNames } from '../nameGenerator';

describe('generateName', () => {
  test('should support terminalWeight and not generate too long word based on it.', () => {
    const probTable1 = {
      '': { 'sum': 1, '': 1 },
    };
    const probTable2 = {
      'ab': { 'sum': 1, 'c': 1 },
      'bc': { 'sum': 1, 'd': 1 },
      'cd': { 'sum': 1, 'e': 1 },
      'de': { 'sum': 1000, '': 1, 'f': 999 },
      'ef': { 'sum': 1, '': 1 },
    };
    const terminalWeightTable = {
      // Use 100000000% of '' if the length of the current word is longer than or equal to 4.
      // In result, it is more likely to generate words shorter than 4.
      '4': 1000000,
    };

    // As the generate function works based on random function, there is still small possibility
    // it returns false negative result('abcdef') even when terminalWeight works properly.
    // To prevent the false failure, generate two words and check the total length of two words.
    // This will lower the false failure possibility.
    const name1 = generateName('ab', { probTable1, probTable2, terminalWeightTable });
    const name2 = generateName('ab', { probTable1, probTable2, terminalWeightTable });

    expect(name1.length + name2.length).toBeLessThan(12);
  });

  test('shouldn\'t generate too short words.', () => {
    const probTable1 = {
      '': { 'sum': 10, 'a': 1, '': 9 },
      'a': { 'sum': 10, 'b': 1, '': 9 },
      'b': { 'sum': 10, 'c': 1, '': 9 },
      'c': { 'sum': 1, '': 1 },
    };
    const probTable2 = {
      'xx': { 'sum': 1, '': 1 },
    };

    // To minimise false positive, generate name twice and check.
    const name1 = generateName('', { probTable1, probTable2 });
    const name2 = generateName('', { probTable1, probTable2 });

    expect(name1).toBe('abc');
    expect(name2).toBe('abc');
  });
});

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
