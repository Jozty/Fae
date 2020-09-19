import curryN from './utils/curry_n.ts'
import type { PH, Obj, Tests } from './utils/types.ts'
import has from './utils/has.ts'

// TODO: (ch-shubham) add docs

// @types
type Where_2<T> = ((testObj: Obj<T>) => boolean) &
  ((testObj?: PH) => Where_2<T>)

type Where_1<T> = ((specs: Tests<T>) => boolean) &
  ((specs?: PH) => Where_1<T>)

type Where = (<T>(specs: Tests<T>, testObj: Obj<T>) => boolean) &
  (<T>(specs: Tests<T>, testObj?: PH) => Where_2<T>) &
  (<T>(specs: PH, testObj: Obj<T>) => Where_1<T>) &
  ((specs?: PH, testObj?: PH) => Where)

function _where<T>(specs: Tests<T>, testObj: Obj<T>) {
  for (let prop in specs) {
    if (has(specs, prop) && !specs[prop](testObj[prop])) {
      return false
    }
  }
  return true
}

export const where: Where = curryN(2, _where)
