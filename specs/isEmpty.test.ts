import { describe, it } from './_describe.ts';
import { isEmpty } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('isEmpty', () => {
  it('should return false for null', () => {
    eq(isEmpty(null), false);
  });

  it('should return false for undefined', () => {
    eq(isEmpty(undefined), false);
    eq(isEmpty(1 / 0), false);
  });

  it('should return false for NaN', () => {
    eq(isEmpty(NaN), false);
  });

  it('should return true for empty string', () => {
    eq(isEmpty(''), true);
    eq(isEmpty(' '), false);
  });

  it('should return true for empty array', () => {
    eq(isEmpty([]), true);
    eq(isEmpty([[]]), false);
    eq(isEmpty([null]), false);
  });

  it('should return true for empty object', () => {
    eq(isEmpty({}), true);
    eq(isEmpty({ x: [] }), false);
    eq(isEmpty({ x: 0 }), false);
  });

  it('should return true for empty arguments object', () => {
    eq(
      isEmpty(
        (function () {
          return arguments;
        })(),
      ),
      true,
    );
    eq(
      isEmpty(
        (function (x) {
          return arguments;
        })(0),
      ),
      false,
    );
  });

  it('should return false for every other value', () => {
    eq(isEmpty(0), false);
    eq(isEmpty(NaN), false);
    eq(isEmpty(['']), false);
  });
});
