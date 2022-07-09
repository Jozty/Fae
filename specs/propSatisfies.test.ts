import { describe, it } from './_describe.ts';
import { _, propSatisfies } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('propSatisfies', () => {
  let isPositive = (n: number) => n > 0;
  const obj = { x: 1, y: 0 };

  it('should return true if the specified object property satisfies the given predicate', () => {
    eq(propSatisfies(isPositive, 'x', obj), true);
  });

  it('should return false otherwise', () => {
    eq(propSatisfies(isPositive, 'y', obj), false);
  });

  it('should work with curried calls too', () => {
    const p_2_3 = propSatisfies(isPositive);

    eq(p_2_3('y')(obj), false);
    eq(p_2_3('y', obj), false);
    eq(p_2_3(_, obj)('y'), false);

    const p_1_3 = propSatisfies(_, 'y');

    eq(p_1_3(isPositive)(obj), false);
    eq(p_1_3(isPositive, obj), false);
    eq(p_1_3(_, obj)(isPositive), false);

    const p_1_2 = propSatisfies(_, _, obj);

    eq(p_1_2(isPositive)('y'), false);
    eq(p_1_2(isPositive, 'y'), false);
    eq(p_1_2(_, 'y')(isPositive), false);

    const p_3 = propSatisfies(isPositive, 'y');
    eq(p_3(obj), false);

    const p_2 = propSatisfies(isPositive, _, obj);
    eq(p_2('y'), false);

    const p_1 = propSatisfies(_, 'y', obj);
    eq(p_1(isPositive), false);
  });
});
