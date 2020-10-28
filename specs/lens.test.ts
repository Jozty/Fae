import { describe, it } from './_describe.ts'
import {
  lens,
  prop,
  assoc,
  lensProp,
  lensIndex,
  lensPath,
  view,
  set,
  over,
  compose,
  LensGetter,
  LensSetter,
} from '../mod.ts'
import { eq } from './utils/utils.ts'

const they = it

const alice = {
  name: 'Alice Jones',
  address: ['22 Walnut St', 'San Francisco', 'CA'],
  pets: { dog: 'joker', cat: 'batman' },
}

type Alice = typeof alice

const nameLens = lens(
  prop('name') as LensGetter<Alice, string>,
  (assoc('name') as any) as LensSetter<Alice, string>,
)

const addressLens = lensProp<Alice, string[]>('address')
const headLens = lensIndex<string[], string>(0)
const dogLens = lensPath<Alice, string>(['pets', 'dog'])

const toUpper = (x: string) => x.toUpperCase()

describe('view, over, and set', () => {
  they('may be applied to a lens created by `lensPath`', () => {
    eq(view(dogLens, alice), 'joker')
  })

  they('may be applied to a lens created by `lensProp`', () => {
    eq(view(nameLens, alice), 'Alice Jones')

    eq(over(nameLens, toUpper, alice), {
      name: 'ALICE JONES',
      address: ['22 Walnut St', 'San Francisco', 'CA'],
      pets: { dog: 'joker', cat: 'batman' },
    })

    eq(set(nameLens, 'Alice Smith', alice), {
      name: 'Alice Smith',
      address: ['22 Walnut St', 'San Francisco', 'CA'],
      pets: { dog: 'joker', cat: 'batman' },
    })
  })

  they('may be applied to a lens created by `lensIndex`', () => {
    eq(view(headLens, alice.address), '22 Walnut St')

    eq(over(headLens, toUpper, alice.address), [
      '22 WALNUT ST',
      'San Francisco',
      'CA',
    ])

    eq(set(headLens, '52 Crane Ave', alice.address), [
      '52 Crane Ave',
      'San Francisco',
      'CA',
    ])
  })

  they('may be applied to composed lenses', () => {
    const streetLens = compose(addressLens, headLens)
    const dogLens = compose(lensPath(['pets']), lensPath(['dog']))

    eq(view(dogLens, alice), view(lensPath(['pets', 'dog']), alice))

    eq(view(streetLens, alice), '22 Walnut St')

    eq(over(streetLens, toUpper, alice), {
      name: 'Alice Jones',
      address: ['22 WALNUT ST', 'San Francisco', 'CA'],
      pets: { dog: 'joker', cat: 'batman' },
    })

    eq(set(streetLens, '52 Crane Ave', alice), {
      name: 'Alice Jones',
      address: ['52 Crane Ave', 'San Francisco', 'CA'],
      pets: { dog: 'joker', cat: 'batman' },
    })
  })
})
