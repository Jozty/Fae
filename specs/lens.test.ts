import { describe, it } from './_describe.ts';
import {
  _,
  assoc,
  compose,
  lens,
  LensGetter,
  lensIndex,
  lensPath,
  lensProp,
  LensSetter,
  over,
  prop,
  set,
  view,
} from '../mod.ts';
import { eq } from './utils/utils.ts';

const they = it;

const alice = {
  name: 'Alice Jones',
  address: ['22 Walnut St', 'San Francisco', 'CA'],
  pets: { dog: 'joker', cat: 'batman' },
};

type Alice = typeof alice;

const nameLens = lens(
  prop('name') as LensGetter<Alice, string>,
  (assoc('name') as any) as LensSetter<Alice, string>,
);

const addressLens = lensProp<Alice, string[]>('address');
const headLens = lensIndex<string[], string>(0);
const dogLens = lensPath<Alice, string>(['pets', 'dog']);

const toUpper = (x: string) => x.toUpperCase();

describe('view, over, and set', () => {
  they('may be applied to a lens created by `lensPath`', () => {
    eq(view(dogLens, alice), 'joker');
  });

  they('may be applied to a lens created by `lensProp`', () => {
    eq(view(nameLens, alice), 'Alice Jones');

    eq(over(nameLens, toUpper, alice), {
      name: 'ALICE JONES',
      address: ['22 Walnut St', 'San Francisco', 'CA'],
      pets: { dog: 'joker', cat: 'batman' },
    });

    eq(set(nameLens, 'Alice Smith', alice), {
      name: 'Alice Smith',
      address: ['22 Walnut St', 'San Francisco', 'CA'],
      pets: { dog: 'joker', cat: 'batman' },
    });
  });

  they('may be applied to a lens created by `lensIndex`', () => {
    eq(view(headLens, alice.address), '22 Walnut St');

    eq(over(headLens, toUpper, alice.address), [
      '22 WALNUT ST',
      'San Francisco',
      'CA',
    ]);

    eq(set(headLens, '52 Crane Ave', alice.address), [
      '52 Crane Ave',
      'San Francisco',
      'CA',
    ]);
  });

  they('may be applied to composed lenses', () => {
    const streetLens = compose(addressLens, headLens);
    const dogLens = compose(lensPath(['pets']), lensPath(['dog']));

    eq(view(dogLens, alice), view(lensPath(['pets', 'dog']), alice));

    eq(view(streetLens, alice), '22 Walnut St');

    eq(over(streetLens, toUpper, alice), {
      name: 'Alice Jones',
      address: ['22 WALNUT ST', 'San Francisco', 'CA'],
      pets: { dog: 'joker', cat: 'batman' },
    });

    eq(set(streetLens, '52 Crane Ave', alice), {
      name: 'Alice Jones',
      address: ['52 Crane Ave', 'San Francisco', 'CA'],
      pets: { dog: 'joker', cat: 'batman' },
    });
  });

  they('should work with curried functions', () => {
    // view
    eq(view(dogLens, alice), 'joker');
    eq(view(dogLens)(alice), 'joker');
    eq(view(_, alice)(dogLens), 'joker');

    // set

    const setExpectedObject = {
      name: 'Alice Jones',
      address: ['22 Walnut St', 'San Francisco', 'CA'],
      pets: { dog: 'a', cat: 'batman' },
    };

    const set_2_3 = set(dogLens);

    eq(set_2_3('a')(alice), setExpectedObject);
    eq(set_2_3('a', alice), setExpectedObject);
    eq(set_2_3(_, alice)('a'), setExpectedObject);

    const set_1_3 = set(_, 'a');

    eq(set_1_3(dogLens)(alice), setExpectedObject);
    eq(set_1_3(dogLens, alice), setExpectedObject);
    eq(set_1_3(_, alice)(dogLens), setExpectedObject);

    const set_1_2 = set(_, _, alice);

    eq(set_1_2(dogLens)('a'), setExpectedObject);
    eq(set_1_2(dogLens, 'a'), setExpectedObject);
    eq(set_1_2(_, 'a')(dogLens), setExpectedObject);

    const set_3 = set(dogLens, 'a');
    eq(set_3(alice), setExpectedObject);

    const set_2 = set(dogLens, _, alice);
    eq(set_2('a'), setExpectedObject);

    const set_1 = set(_, 'a', alice);
    eq(set_1(dogLens), setExpectedObject);

    // set

    const overExpectedObject = {
      name: 'Alice Jones',
      address: ['22 Walnut St', 'San Francisco', 'CA'],
      pets: { dog: 'JOKER', cat: 'batman' },
    };

    const trans = (x: string) => x.toUpperCase();

    const over_2_3 = over(dogLens);

    eq(over_2_3(trans)(alice), overExpectedObject);
    eq(over_2_3(trans, alice), overExpectedObject);
    eq(over_2_3(_, alice)(trans), overExpectedObject);

    const over_1_3 = over(_, trans);

    eq(over_1_3(dogLens)(alice), overExpectedObject);
    eq(over_1_3(dogLens, alice), overExpectedObject);
    eq(over_1_3(_, alice)(dogLens), overExpectedObject);

    const over_1_2 = over(_, _, alice);

    eq(over_1_2(dogLens)(trans), overExpectedObject);
    eq(over_1_2(dogLens, trans), overExpectedObject);
    eq(over_1_2(_, trans)(dogLens), overExpectedObject);

    const over_3 = over(dogLens, trans);
    eq(over_3(alice), overExpectedObject);

    const over_2 = over(dogLens, _, alice);
    eq(over_2(trans), overExpectedObject);

    const over_1 = over(_, trans, alice);
    eq(over_1(dogLens), overExpectedObject);
  });
});
