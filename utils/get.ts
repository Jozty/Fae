import { Func } from "./types.ts"
import { FUNCTION_LENGTH } from "./constants.ts"

export function getIterator<T = any>(iterable: Iterable<T>) {
  return iterable[Symbol.iterator]()
}

export function getFunctionLength(func: Func) {
  return func[FUNCTION_LENGTH]
}
