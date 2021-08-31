export interface IGridColumnDefinition<T> {
  headerResourceKey: string;
  cellPropertyName: keyof T;
  width: string;
}
