import { describe, it } from './_describe.ts'
import { insert, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('insert', () => {
  it('should insert an element into the given list', () => {
    const list = ['a', 'b', 'c', 'd', 'e']
    eq(insert(1, 'x', list), ['a', 'x', 'b', 'c', 'd', 'e'])
    eq(insert(2, 'x', list), ['a', 'b', 'x', 'c', 'd', 'e'])
    eq(insert(3, 'x', list), ['a', 'b', 'c', 'x', 'd', 'e'])
    eq(insert(4, 'x', list), ['a', 'b', 'c', 'd', 'x', 'e'])
    eq(insert(5, 'x', list), ['a', 'b', 'c', 'd', 'e', 'x'])
  })

  it('should insert another list as an element', () => {
    const list: (string | string[])[] = ['a', 'b', 'c', 'd', 'e']
    eq(insert(2, ['s', 't'], list), [
      'a',
      'b',
      ['s', 't'],
      'c',
      'd',
      'e',
    ])

    eq(insert(3, ['a', 'b'], list), [
      'a',
      'b',
      'c',
      ['a', 'b'],
      'd',
      'e',
    ])

    eq(insert(4, ['s', 't'], list), [
      'a',
      'b',
      'c',
      'd',
      ['s', 't'],
      'e',
    ])

    eq(insert(5, ['s', 't'], list), [
      'a',
      'b',
      'c',
      'd',
      'e',
      ['s', 't'],
    ])
  })

  it('should append to the end of the list if the index is too large', () => {
    const list = ['a', 'b', 'c', 'd', 'e']
    eq(insert(8, 'z', list), ['a', 'b', 'c', 'd', 'e', 'z'])
  })

  it('should append to the start of the list', () => {
    const list = ['a', 'b', 'c', 'd', 'e']
    eq(insert(0, 'z', list), ['z', 'a', 'b', 'c', 'd', 'e'])
  })

  it('should append element from the last of the list', () => {
    const list = ['a', 'b', 'c', 'd', 'e']
    eq(insert(-1, 'z', list), ['a', 'b', 'c', 'd', 'e', 'z'])
  })

  it('should test curried versions too', () => {
    const list = ['a', 'b', 'c', 'd', 'e']
    
    eq(insert(0)('z')(list), ['z', 'a', 'b', 'c', 'd', 'e'])
    eq(insert(0, _, list)('z'), ['z', 'a', 'b', 'c', 'd', 'e'])
    eq(insert(_, 'z', list)(8), ['a', 'b', 'c', 'd', 'e', 'z'])
    eq(insert(3, 'x', _)(list), ['a', 'b', 'c', 'x', 'd', 'e'])
    eq(insert(3, _, list)('x'), ['a', 'b', 'c', 'x', 'd', 'e'])
    eq(insert(_, _, list)(4, 'x'), ['a', 'b', 'c', 'd', 'x', 'e'])
    eq(insert(5, _, _)('x', list), ['a', 'b', 'c', 'd', 'e', 'x'])
    eq(insert(_, 'x', _)(1, list), ['a', 'x', 'b', 'c', 'd', 'e'])
    eq(insert(_, _, list)(1)('x'), ['a', 'x', 'b', 'c', 'd', 'e'])

    const insert0 = insert(0,_,_)

    eq(insert0('z', list), ['z', 'a', 'b', 'c', 'd', 'e'])
    eq(insert0('z', _)(list), ['z', 'a', 'b', 'c', 'd', 'e'])
    eq(insert0(_, list)('z'), ['z', 'a', 'b', 'c', 'd', 'e'])

    const insert1 = insert(1)
    eq(insert1('z')(list), ['a', 'z', 'b', 'c', 'd', 'e'])

    const insertz = insert(_,'z',_)
    eq(insertz(5, list), ['a', 'b', 'c', 'd', 'e', 'z'])

    const insertz0 = insert(0,'z',_)
    eq(insertz0(list), ['z', 'a', 'b', 'c', 'd', 'e'])

    const insertz1 = insert1('z')
    eq(insertz1(list), ['a', 'z', 'b', 'c', 'd', 'e'])





 
  })
})
