import { describe, it } from './_describe.ts';
import { _, insert } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('insert', () => {
  it('should insert an element into the given list', () => {
    const list = ['a', 'b', 'c', 'd', 'e'];
    eq(insert(1, 'x', list), ['a', 'x', 'b', 'c', 'd', 'e']);
    eq(insert(2, 'x', list), ['a', 'b', 'x', 'c', 'd', 'e']);
    eq(insert(3, 'x', list), ['a', 'b', 'c', 'x', 'd', 'e']);
    eq(insert(4, 'x', list), ['a', 'b', 'c', 'd', 'x', 'e']);
    eq(insert(5, 'x', list), ['a', 'b', 'c', 'd', 'e', 'x']);
  });

  it('should insert another list as an element', () => {
    const list: (string | string[])[] = ['a', 'b', 'c', 'd', 'e'];
    eq(insert(2, ['s', 't'], list), [
      'a',
      'b',
      ['s', 't'],
      'c',
      'd',
      'e',
    ]);

    eq(insert(3, ['a', 'b'], list), [
      'a',
      'b',
      'c',
      ['a', 'b'],
      'd',
      'e',
    ]);

    eq(insert(4, ['s', 't'], list), [
      'a',
      'b',
      'c',
      'd',
      ['s', 't'],
      'e',
    ]);

    eq(insert(5, ['s', 't'], list), [
      'a',
      'b',
      'c',
      'd',
      'e',
      ['s', 't'],
    ]);
  });

  it('should append to the end of the list if the index is too large', () => {
    const list = ['a', 'b', 'c', 'd', 'e'];
    eq(insert(8, 'z', list), ['a', 'b', 'c', 'd', 'e', 'z']);
  });

  it('should append to the start of the list', () => {
    const list = ['a', 'b', 'c', 'd', 'e'];
    eq(insert(0, 'z', list), ['z', 'a', 'b', 'c', 'd', 'e']);
  });

  it('should append element from the last of the list', () => {
    const list = ['a', 'b', 'c', 'd', 'e'];
    eq(insert(-1, 'z', list), ['a', 'b', 'c', 'd', 'e', 'z']);
  });

  it('should test curried versions too', () => {
    const obj = ['a', 'b', 'c', 'd', 'e'];

    const p_2_3 = insert(0);

    eq(p_2_3('z')(obj), ['z', 'a', 'b', 'c', 'd', 'e']);
    eq(p_2_3('z', obj), ['z', 'a', 'b', 'c', 'd', 'e']);
    eq(p_2_3(_, obj)('z'), ['z', 'a', 'b', 'c', 'd', 'e']);
    const p_1_3 = insert(_, 'z');

    eq(p_1_3(5)(obj), ['a', 'b', 'c', 'd', 'e', 'z']);
    eq(p_1_3(5, obj), ['a', 'b', 'c', 'd', 'e', 'z']);
    eq(p_1_3(_, obj)(5), ['a', 'b', 'c', 'd', 'e', 'z']);

    const p_1_2 = insert(_, _, obj);

    eq(p_1_2(1)('z'), ['a', 'z', 'b', 'c', 'd', 'e']);
    eq(p_1_2(1, 'z'), ['a', 'z', 'b', 'c', 'd', 'e']);
    eq(p_1_2(_, 'z')(1), ['a', 'z', 'b', 'c', 'd', 'e']);

    const p_3 = insert(0, 'z');
    eq(p_3(obj), ['z', 'a', 'b', 'c', 'd', 'e']);

    const p_2 = insert(0, _, obj);
    eq(p_2('z'), ['z', 'a', 'b', 'c', 'd', 'e']);

    const p_1 = insert(_, 'z', obj);
    eq(p_1(0), ['z', 'a', 'b', 'c', 'd', 'e']);

    eq(insert(0)('z')(obj), ['z', 'a', 'b', 'c', 'd', 'e']);
    eq(insert(0, _, obj)('z'), ['z', 'a', 'b', 'c', 'd', 'e']);
    eq(insert(_, 'z', obj)(8), ['a', 'b', 'c', 'd', 'e', 'z']);
    eq(insert(3, 'x')(obj), ['a', 'b', 'c', 'x', 'd', 'e']);
    eq(insert(3, _, obj)('x'), ['a', 'b', 'c', 'x', 'd', 'e']);
    eq(insert(_, _, obj)(4, 'x'), ['a', 'b', 'c', 'd', 'x', 'e']);
    eq(insert(5)('x', obj), ['a', 'b', 'c', 'd', 'e', 'x']);
    eq(insert(_, 'x')(1, obj), ['a', 'x', 'b', 'c', 'd', 'e']);
    eq(insert(_, _, obj)(1)('x'), ['a', 'x', 'b', 'c', 'd', 'e']);
  });
});
