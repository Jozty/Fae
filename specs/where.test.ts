import { describe, it } from "./_describe.ts"
import { where, curry } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('where', () => {
  const equals = curry(2, (x: any, y: any) => x === y)

  it('should be properly declared.', function() {
    let spec = {x: equals('foo'), y: equals(7)}
    let spec2 = {x: equals(undefined)}
    let test1 = {x: 12, y: 200}
    let test2 = {x: 'foo', y: 7}
    let test4 = {x: null}
    let test5 = {x: undefined}
    let test6 = {x: 1}

    eq(where(spec, test1), false)
    eq(where(spec, test2), true)
    eq(where(spec2, test4), false)
    eq(where(spec2, test5), true)
    eq(where(spec2, test6), false)
    eq(where({}, {x: 1}), true)  

  })

  it('should work with test and spec having different interface', function() {
    let spec = {x: equals(20)}
    let test1 = {x: 125, y: 100, z: 100}
    let test2 = {p: 1, x: 20, y: 100, z: 100}

    eq(where(spec, test1), false)
    eq(where(spec, test2), true)
  })
})
