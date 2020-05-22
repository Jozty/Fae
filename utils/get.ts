export function getIterator<T = any>(iterable: Iterable<T>) {
  return iterable[Symbol.iterator]()
}