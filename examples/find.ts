import * as Fae from 'https://deno.land/x/fae/mod.ts';

const obj = { even: 3, odd: 1, string: '2345' };
const arr = [1, 3, 4, 5, 5, 6, 7, 17, 8, 8, 13, 'foo', obj, null, undefined, 9];
const falsy = ['', null, undefined, 0];

const gt5 = (x: any) => x > 5;
const isUndefined = (x: any) => String(x) === String(typeof undefined);
const isTruthy = (x: any) => String(typeof x) !== String(x);
const isEq9 = (x: any) => x === 9;

const arrHasValueEqual9 = Fae.find(isEq9, arr);
const isFalsy = Fae.find(isTruthy, falsy);
const hasUndefined = Fae.find(isUndefined, falsy);

console.assert(arrHasValueEqual9 === 9);
console.assert(isFalsy === '');
console.assert(hasUndefined === undefined);
