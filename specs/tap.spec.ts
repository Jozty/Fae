import { describe, it } from "./_describe.ts"
import {
  flip,
  append,
  tap,
  identity,
  map,
  pipe,
  curry,
} from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('tap', () => {
  const pushToList = curry(2, (a: number[], b: number[]) => a.push(...b))

  it('should return a function that always returns its argument', () => {
    const f = tap(identity)
    eq(typeof f, 'function')
    eq(f(100), 100)
    eq(f(undefined), undefined)
    eq(f(null), null)
  })

  it("may take a function as the first argument that executes with tap's argument", () => {
    let sideEffect: any = 0
    eq(sideEffect, 0)
    const rv = tap((x: any) => sideEffect = 'string ' + x , 200)
    eq(rv, 200)
    eq(sideEffect, 'string 200')
  })

  it('can act as a transducer', function() {
    const sideEffect: number[] = []
    const numbers = [1, 2, 3, 4, 5]

    // @ts-ignore
    const xf = pipe(map(identity), tap(pushToList(sideEffect)))

    eq(xf(numbers), numbers)
    eq(sideEffect, numbers)
  })
})