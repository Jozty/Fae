import { describe, it } from './_describe.ts'
import { prop, path, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('prop', () => {
  const obj = { name: 'John', age: 23 }

  it('should work with curried functions too', () => {
    eq(prop('name', obj), 'John')
    eq(prop('name')(obj), 'John')
    eq(prop('name', _)(obj), 'John')
    eq(prop(_, obj)('name'), 'John')
  })

  it('should handle number as property', () => {
    const deities = ['Cthulhu', 'Dagon', 'Yog-Sothoth']
    eq(prop(0, deities), 'Cthulhu')
    eq(prop(1, deities), 'Dagon')
    eq(prop(2, deities), 'Yog-Sothoth')
    eq(prop(-1, deities), 'Yog-Sothoth')
  })

  it('should show the same behavior as path for a nonexistent property', () => {
    const propResult: string | number | undefined = prop('incorrect', obj)
    const pathResult: typeof propResult = path(['incorrect'], obj)
    eq(propResult, pathResult)
  })

  it('should show the same behavior as path for an undefined property', () => {
    // @ts-expect-error
    const propResult = prop(undefined, obj)
    // @ts-expect-error
    const pathResult = path([undefined], obj)
    // @ts-expect-error
    eq(propResult, pathResult)
  })

  it('should show the same behavior as path for a null property', () => {
    // @ts-expect-error
    const propResult = prop(null, obj)
    // @ts-expect-error
    const pathResult = path([null], obj)
    // @ts-expect-error
    eq(propResult, pathResult)
  })

  it('should show the same behavior as path for a valid property and object', () => {
    const propResult = prop('age', obj)
    const pathResult: typeof propResult = path(['age'], obj)
    eq(propResult, pathResult)
  })

  it('should show the same behavior as path for a null object', () => {
    // @ts-expect-error
    const propResult: null = prop('age', null)
    const pathResult: null = path(['age'], null)
    eq(propResult, pathResult)
  })

  it('should show the same behavior as path for an undefined object', () => {
    let propResult, propException, pathResult, pathException
    try {
      propResult = prop('name', undefined)
    } catch (e) {
      propException = e
    }

    try {
      pathResult = path(['name'], undefined)
    } catch (e) {
      pathException = e
    }

    // @ts-expect-error
    eq(propResult, pathResult)
    eq(propException, pathException)
  })
})
