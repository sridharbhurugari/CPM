export function groupAndSum<T>(arr: T[], groupKeys: string[], sumKeys: string[]) {
  if(!arr || !groupKeys || !sumKeys) return arr || [];

  const zeroSumObject = {};
  sumKeys.forEach(key => { zeroSumObject[key] = 0; });

  return [...arr.reduce((acc, currItem) => {
    let keyString = [];
    groupKeys.forEach((key) => {
      keyString.push()
    })

    const key = groupKeys.map(key => currItem[key]).join('-');
    const item = acc.get(key) || Object.assign({}, currItem, zeroSumObject);


    sumKeys.forEach(key => {
      item[key] += currItem[key];
    });

    return acc.set(key, item);
  }, new Map).values()];
}
