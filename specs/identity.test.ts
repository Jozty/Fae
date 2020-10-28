import { describe, it } from './_describe.ts'
import { identity } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('identity', () => {

  it('returns its first argument', function () {
    eq(identity(undefined), undefined)
    eq(identity('foo'), 'foo')
    // @ts-ignore
    eq(identity('foo', 'bar'), 'foo')
  })

  it('returns its return value of function', function () {
    let f = (x: number) => ++x
    let g = (y: string) => y+'bar'
    eq(identity(f(1)), 2)
    eq(identity(g('foo')), 'foobar')
  })
})
