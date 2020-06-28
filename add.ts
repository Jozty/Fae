import curryN from "./utils/curry_n.ts"
import { PH } from "./utils/types.ts"

// @types
type Add_2 = ((b: number) => number)
  & ((b?: PH) => Add_2)

type Add_1 = ((a: number) => number)
  & ((a?: PH) => Add_1)

type Add = ((a: number, b: number) => number)
  & ((a: number, b?: PH) => Add_2)
  & ((a: PH, b: number) => Add_1)
  & ((a?: PH, b?: PH) => Add)


function _add(a: number, b: number) {
  return a + b
}

/**
 * Adds two numbers
 * 
 *      const add5 = Fae.add(5, Fae._)
 *      const a = add5(4) // 9
 */
 export const add: Add = curryN(2, _add)
