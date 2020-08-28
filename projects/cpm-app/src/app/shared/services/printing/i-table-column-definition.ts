export interface ITableColumnDefintion<T> {
    headerResourceKey: string;
    cellPropertyNames: (keyof T)[];
    width: string;
}