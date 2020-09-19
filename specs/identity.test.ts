import { describe, it } from './_describe.ts'
import { identity } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('identity', () => {
  it('should return its first argument', () => {
    it('returns its first argument', function () {
      eq(identity(undefined), undefined)
      eq(identity('foo'), 'foo')
      // @ts-ignore
      eq(identity('foo', 'bar'), 'foo')
    })
  })
})
