import * as Fae from 'https://deno.land/x/fae/mod.ts'

// "or" with two input arguments
// returns false if both args are false
console.assert(Fae.or('', 2) === true)
console.assert(Fae.or('', false) === false)
console.assert(Fae.or('', 0) === false)
console.assert(Fae.or(2, true) === true)
console.assert(Fae.or('ab', true) === true)
console.assert(Fae.or(2, 'ab') === true)

// with single inputs
// return a curried functions which takes single input and updates results depending on both inputs
const orWithFalsyValue = Fae.or('')
console.assert(orWithFalsyValue('ab') === true)
console.assert(orWithFalsyValue(false) === false)
console.assert(orWithFalsyValue(0) === false)

const orWithTruthyValue = Fae.or(2)
console.assert(orWithTruthyValue(true) === true)
console.assert(orWithTruthyValue('ab') === true)
console.assert(orWithTruthyValue(2) === true)

console.log('Examples successfully running')
