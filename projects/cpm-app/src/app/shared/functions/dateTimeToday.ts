export function dateTimeToday() {
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}