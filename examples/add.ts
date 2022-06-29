import * as Fae from 'https://deno.land/x/fae/mod.ts'

console.assert(Fae.add(1, 2) === 3)
console.assert(Fae.add(1, -2) === -1)

const plus5 = Fae.add(5)

console.assert(plus5(3) === 8)
console.assert(plus5(-7) === -2)
console.assert(plus5(0) === 5)

console.log('Example ran successfully')
