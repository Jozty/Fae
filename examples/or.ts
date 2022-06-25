import * as Fae from 'https://deno.land/x/fae/mod.ts';

// "or" with two input arguments

// falsy value
const a = ''
const b = false
const c = 0

// truthy values
const z = 2
const y = true
const x = 'ab'

// if two args are provided returns boolean
// returns false if both args are false
console.assert(Fae.or(a, z) === true)
console.assert(Fae.or(a, b) === false)
console.assert(Fae.or(a, c) === false)
console.assert(Fae.or(z, y) === true)
console.assert(Fae.or(x, y) === true)
console.assert(Fae.or(z, x) === true)

// with single inputs
// return a curried functions which takes single input and updates results depending on both inputs
const orWithFalsyValue = Fae.or(a)
console.assert(orWithFalsyValue(x) === true)
console.assert(orWithFalsyValue(b) === false)
console.assert(orWithFalsyValue(c) === false)

const orWithTruthyValue = Fae.or(z)
console.assert(orWithTruthyValue(y) === true)
console.assert(orWithTruthyValue(x) === true)
console.assert(orWithTruthyValue(c) === true)
