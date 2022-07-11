import { describe, it } from './_describe.ts';
import { identity } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('identity', () => {
  it('should returns its first argument', function () {
    eq(identity(undefined), undefined);
    eq(identity('foo'), 'foo');
    // fae-no-check
    // @ts-ignore
    eq(identity('foo', 'bar'), 'foo');
  });

  it('should returns its return value of function being passes', function () {
    const f = (x: number) => ++x;
    const g = (y: string) => y + 'bar';
    eq(identity(f(1)), 2);
    eq(identity(g('foo')), 'foobar');
  });
});
