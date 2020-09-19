import { describe, it } from './_describe.ts'
import { path, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

const obj1 = {
  a: {
    b: 1,
  },
  c: {
    d: 2,
  },
}

const obj2 = {
  a: [
    1,
    2,
    {
      ab: 5,
      de: [12, 23, 25],
    },
    '234',
  ],
  4: 'sdf',
}

const path1 = path(_, obj1)
const path2 = path(_, obj2 as any)

describe('path', () => {
  it('should work on objects', () => {
    eq(path1(['a', 'b']), 1)
    eq(path1('a/b'), 1)
    eq(path1('c.d'), 2)
    eq(path1('c.e'), undefined)
  })

  it('should work with object with mixed type props', () => {
    eq(path2('a'), obj2.a)
    eq(path2('a/2/ab'), 5)
    eq(path2('a.1'), 2)
    eq(path2('4'), 'sdf')
    eq(path2('a/2/de'), [12, 23, 25])
  })
})
