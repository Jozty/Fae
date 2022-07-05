import * as Fae from 'https://deno.land/x/fae/mod.ts';

// "and" with two input arguments
// returns true if both args are true
console.assert(Fae.and('', 2) === false);
console.assert(Fae.and('', false) === false);
console.assert(Fae.and('', 0) === false);
console.assert(Fae.and(2, true) === true);
console.assert(Fae.and('ab', true) === true);
console.assert(Fae.and(2, 'ab') === true);

// with single inputs
// return a curried functions which takes single input and updates results depending on both inputs
const andWithFalsyValue = Fae.and('');
console.assert(andWithFalsyValue('ab') === false);
console.assert(andWithFalsyValue(false) === false);
console.assert(andWithFalsyValue(0) === false);

const andWithTruthyValue = Fae.and(2);
console.assert(andWithTruthyValue(true) === true);
console.assert(andWithTruthyValue('ab') === true);
console.assert(andWithTruthyValue(2) === true);
