import { describe, it } from './_describe.ts'
import { propOr } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('propOr', () => {
  let shubham = { name: 'shubham', age: 23 }
  let shivam = { age: 99 }

  let num = propOr('Unknown', 'name')

  it('should return a function that fetches the appropriate property', () => {
    eq(typeof num, 'function')
    eq(num(shubham), 'shubham')
  })

  it('should return the default value when the property does not exist', () => {
    eq(num(shivam), 'Unknown')
  })

  it('should return the default value when the object is nil', () => {
    eq(num(null), 'Unknown')
    eq(num(void 0), 'Unknown' as any)
  })

  it('should use the default when supplied an object with a nil value', () => {
    eq(propOr('foo', 'x', { x: null }), 'foo')
    eq(propOr('foo', 'x', { x: undefined }), 'foo')
  })
})
