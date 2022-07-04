import { describe, it } from './_describe.ts';
import { eq } from './utils/utils.ts';
import { _, reverse } from '../mod.ts';

describe('reverse', () => {
  it('should reverse array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const arr2 = [...arr];
    const expected = [...arr].reverse();
    eq(reverse(arr), expected);
    eq(arr, arr2); // should not affect the original
  });

  it('should reverse array with undefined and mixed types', () => {
    const arr = [
      1,
      2,
      '123',
      'asf',
      'd',
      { a: 1, b: 3 },
      () => void 0,
      Symbol('abc'),
    ];
    const arr2 = [...arr];
    const expected = [...arr].reverse();
    eq(reverse(arr), expected);
    eq(arr, arr2); // should not affect the original
    eq(reverse(expected), arr2);
    eq(reverse(expected), arr2); // check if the `expected` was not change in the previous call
  });

  it('should reverse strings', () => {
    const str = 'asdfghjklqwertyuiopQWERTYUIOPZXCVBNM';
    const str2 = str.split('').join('');
    const expected = str.split('').reverse().join('');
    eq(reverse(str), expected);
    eq(str, str2); // should not affect the original
  });

  it('should reverse strings with non-ascii characters', () => {
    let str = 'sdf1234@#$%^&~\u2345♫çñè\x00';
    for (let i = 0; i < 10000; i++) str += String.fromCharCode(i);
    const str2 = str.split('').join('');
    const expected = str.split('').reverse().join('');
    eq(reverse(str), expected);
    eq(str, str2);
  });

  it('should work with arrays of different lengths', () => {
    let arr: number[] = [];
    let expected: number[] = [];
    for (let i = 0; i < 10000; i++) arr.push(i);
    for (let i = 9999; i >= 0; i--) expected.push(i);
    eq(reverse(arr), expected);

    arr = [];
    expected = [];
    eq(reverse(arr), expected);

    arr = [1];
    expected = [1];
    eq(reverse(arr), expected);
  });
});
