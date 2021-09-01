export function groupAndSum<T>(arr: T[], groupKeys: string[], sumKeys: string[]) {
  // This function will group and sum an array. Summing only allows for numbers and arrays.
  if(!arr || !groupKeys || !sumKeys) return arr || [];
  const propertyTypeCheck = {...arr[0] } as T;

  const zeroSumObject = {} as T;
  sumKeys.forEach(key => {
    if(propertyTypeCheck[key] instanceof Array) {
      zeroSumObject[key] = [];
    } else if(typeof propertyTypeCheck[key] === 'number') {
      zeroSumObject[key] = 0;
    }
  });

  return [...arr.reduce((acc, currItem) => {
    let keyString = [];
    groupKeys.forEach((key) => {
      keyString.push()
    })

    const key = groupKeys.map(key => currItem[key]).join('-');
    const item = acc.get(key) || Object.assign({} as T, currItem, zeroSumObject);


    sumKeys.forEach(key => {
      if(propertyTypeCheck[key] instanceof Array) {
        item[key] = [...item[key], ...currItem[key]]
      } else if(typeof propertyTypeCheck[key] ===  'number') {
        item[key] += currItem[key];
      }

    });

    return acc.set(key, item);
  }, new Map).values()];
}
