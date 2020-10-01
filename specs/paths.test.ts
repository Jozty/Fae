import { describe, it } from './_describe.ts'
import { paths, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

const obj1 = {
  a: {
    b: 1,
  },
  c: {
    d: 2,
  },
}

const pathsA1 = [
  ['a', 'b'],
  ['c', 'd'],
  ['a', 'a'],
  ['f', 'f', 'f'],
]

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

const paths1 = paths(_, obj1)
const paths2 = paths(_, obj2)

describe('paths', () => {
  it('should work on objects', () => {
    eq(paths1(pathsA1), [1, 2, undefined, undefined])
    eq(paths1(['a/b', 'c/d', 'a/a', 'f/f/f']), [
      1,
      2,
      undefined,
      undefined,
    ])
    eq(paths1(['a/b/', '/c/d', '/a/b/', 'f/f/f/']), [
      1,
      2,
      1,
      undefined,
    ])
    eq(paths1(['a.b', 'c.d', 'a.a', 'f.f.f']), [
      1,
      2,
      undefined,
      undefined,
    ])
    eq(paths1(['a.b.', '.c.d', '.a.b.', 'f.f.f.']), [
      1,
      2,
      1,
      undefined,
    ])
    eq(paths(['', ['p', 0, 'q']], { a: { b: 2 }, p: [{ q: 3 }] }), [
      { a: { b: 2 }, p: [{ q: 3 }] },
      3,
    ])
    eq(paths([[], ['p', 0, 'q']], { a: { b: 2 }, p: [{ q: 3 }] }), [
      { a: { b: 2 }, p: [{ q: 3 }] },
      3,
    ])
    eq(
      paths(
        [
          ['a', ''],
          ['p', 0, 'q'],
        ],
        { a: { b: 2 }, p: [{ q: 3 }] },
      ),
      [undefined, 3],
    )
  })

  it('should work with object with mixed type props', () => {
    eq(paths2(['a']), [obj2.a])
    eq(paths2([['a', 0], ['a', 2, 'de', 0], ['a', 2, 'de'], [4]]), [
      1,
      12,
      [12, 23, 25],
      'sdf',
    ])
    eq(
      paths2([['a', -4], ['a', -2, 'de', -4], ['a', -2, 'de'], [4]]),
      [1, undefined, [12, 23, 25], 'sdf'],
    )
  })

  it('should test curried versions too', () => {
    eq(paths(['a', 'b'])({ a: 2, b: 3, c: { k: [1, 2, 3] } }), [2, 3])
    eq(paths(_, { a: 2, b: 3, c: { k: [1, 2, 3] } })(['c.k']), [
      [1, 2, 3],
    ])
    eq(
      paths(
        ['c.k.0', 'c/k/-1'],
        _,
      )({ a: 2, b: 3, c: { k: [1, 2, 3] } }),
      [1, 3],
    )
  })
})
