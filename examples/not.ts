import * as Fae from 'https://deno.land/x/fae/mod.ts'

// "not" with single input arguments
// returns false args is true else false
console.assert(Fae.not('') === true)
console.assert(Fae.not(false) === true)
console.assert(Fae.not(undefined) === true)
console.assert(Fae.not(null) === true)

console.assert(Fae.not(2) === false)
console.assert(Fae.not(true) === false)
console.assert(Fae.not('ab') === false)
console.assert(Fae.not([1, 2]) === false)
console.assert(Fae.not({ a: 1, b: 3 }) === false)
