// @flow

export const mergeTwoTables = (table1: {}, table2: {}, weight1: number = 1, weight2: number = 1)
: {} => {
  const newTable = Object.assign({}, table1);

  for (const key in table2) {
    if (table2.hasOwnProperty(key)) {
      if (newTable[key] === undefined && typeof(table2[key]) === 'number') {
        newTable[key] = table2[key] * weight2;
      } else if (newTable[key] === undefined && typeof(table2[key]) === 'object') {
        newTable[key] = mergeTwoTables({}, table2[key], weight1, weight2);
      } else if (typeof(newTable[key]) === 'number' && typeof(table2[key]) === 'number') {
        newTable[key] = newTable[key] * weight1 + table2[key] * weight2;
      } else if (typeof(newTable[key]) === 'object' && typeof(table2[key]) === 'object') {
        newTable[key] = mergeTwoTables(newTable[key], table2[key], weight1, weight2);
      } else {
        throw 'cannot merge';
      }
    }
  }

  return newTable;
};
