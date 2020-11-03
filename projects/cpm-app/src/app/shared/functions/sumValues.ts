export function sumValues<T>(sourceArr: T[], valueSelector: (source: T) => number) {
    let values = sourceArr.map(valueSelector);
    return values.reduce((total, value) => total + value);
}