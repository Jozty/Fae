import { describe, it } from './_describe.ts';
import { _, subtract } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('subtract', () => {
  it('should be declared correctly', () => {
    eq(subtract(20, 10), 10);
    eq(subtract(10, 20), -10);
    eq(subtract(NaN, 10), NaN);
    eq(subtract(10, NaN), NaN);
    eq(subtract(Infinity, 4), Infinity);
    eq(subtract(25, Infinity), -Infinity);
    eq(subtract(Infinity, Infinity), NaN);
    eq(subtract(0, 0), 0);
    eq(subtract(25, 0), 25);
  });

  it('should test curried versions too', () => {
    eq(subtract(25)(50), -25);
    eq(subtract(50)(25), 25);
    eq(subtract(_, 25)(50), 25);
    eq(subtract(_, 50)(25), -25);
    eq(subtract(50)(25), 25);
    eq(subtract(25)(50), -25);
  });
});
