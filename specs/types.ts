export interface DemoIterable {
  limit: number;
  current: number;
  [Symbol.iterator]: (this: DemoIterable) => {
    l: number;
    i: number;
    next(): IteratorResult<string>;
  };
}
