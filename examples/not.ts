import * as Fae from 'https://deno.land/x/fae/mod.ts'

// "not" with single input arguments

// falsy value
const a = ''
const b = false
const c = undefined
const d = null

// truthy values
const z = 2
const y = true
const x = 'ab'
const w = [1, 2]
const v = { a: 1, b: 3 }

// returns false args is true else false
console.assert(Fae.not(a) === true)
console.assert(Fae.not(b) === true)
console.assert(Fae.not(c) === true)
console.assert(Fae.not(d) === true)

console.assert(Fae.not(z) === false)
console.assert(Fae.not(y) === false)
console.assert(Fae.not(x) === false)
console.assert(Fae.not(w) === false)
console.assert(Fae.not(v) === false)
