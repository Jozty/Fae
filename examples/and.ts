import * as Fae from 'https://deno.land/x/fae/mod.ts'

// "and" with two input arguments

// falsy value
const a = ''
const b = false
const c = 0

// truthy values
const z = 2
const y = true
const x = 'ab'

// if two args are provided returns boolean
// returns true if both args are true
console.assert(Fae.and(a, z) === false)
console.assert(Fae.and(a, b) === false)
console.assert(Fae.and(a, c) === false)
console.assert(Fae.and(z, y) === true)
console.assert(Fae.and(x, y) === true)
console.assert(Fae.and(z, x) === true)

// with single inputs
// return a curried functions which takes single input and updates results depending on both inputs
const andWithFalsyValue = Fae.and(a)
console.assert(andWithFalsyValue(x) === false)
console.assert(andWithFalsyValue(b) === false)
console.assert(andWithFalsyValue(c) === false)

const andWithTruthyValue = Fae.and(z)
console.assert(andWithTruthyValue(y) === true)
console.assert(andWithTruthyValue(x) === true)
console.assert(andWithTruthyValue(z) === true)
