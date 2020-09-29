import { describe, it } from './_describe.ts'
import { prop, path, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('prop', () => {
  const obj = { name: 'John', age: 23 }

  it('should return a function that fetches the appropriate property', () => {
    const nm = prop('name')
    eq(typeof nm, 'function')
    eq(nm(obj), 'John')
  })

  it('should handle number as property', () => {
    const deities = ['Cthulhu', 'Dagon', 'Yog-Sothoth']
    eq(prop(0, deities), 'Cthulhu')
    eq(prop(1, deities), 'Dagon')
    eq(prop(2, deities), 'Yog-Sothoth')
    eq(prop(-1, deities), 'Yog-Sothoth')
  })

  it('should show the same behavior as path for a nonexistent property', () => {
    const propResult = prop('incorrect', obj)
    const pathResult = path(['incorrect'], obj)
    eq(propResult, pathResult)
  })

  it('should show the same behavior as path for an undefined property', () => {
    // @ts-ignore
    const propResult = prop(undefined, obj)
    // @ts-ignore
    const pathResult = path([undefined], obj)
    // fae-no-check
    // @ts-ignore
    eq(propResult, pathResult)
  })

  it('should show the same behavior as path for a null property', () => {
    // @ts-ignore
    const propResult = prop(null, obj)
    // @ts-ignore
    const pathResult = path([null], obj)
    // fae-no-check
    // @ts-ignore
    eq(propResult, pathResult)
  })

  it('should show the same behavior as path for a valid property and object', () => {
    const propResult = prop('age', obj)
    const pathResult = path(['age'], obj)
    eq(propResult, pathResult)
  })

  it('should show the same behavior as path for a null object', () => {
    // @ts-ignore
    const propResult = prop('age', null)
    // @ts-ignore
    const pathResult = path(['age'], null)
    eq(propResult, pathResult)
  })

  it('should show the same behavior as path for an undefined object', () => {
    //@ts-ignore
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

    // fae-no-check
    // @ts-ignore
    eq(propResult, pathResult)
    eq(propException, pathException)
  })
})
