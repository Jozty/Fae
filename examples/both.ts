import * as Fae from 'https://deno.land/x/fae/mod.ts'

const isGreaterThan5 = (x: number) => x > 5
const isLessThan13 = (x: number) => x < 13
const isOdd = (y: number) => y % 2 !== 0
const isLessThan1 = (x: number) => x < 1

const isBetween5And13 = Fae.both(isGreaterThan5, isLessThan13)
const oddLessThan1 = Fae.both(isLessThan1, isOdd)
const oddGreaterThan5 = Fae.both(isOdd, isGreaterThan5)

console.assert(isBetween5And13(12) === true)
console.assert(oddLessThan1(3) === false)
console.assert(oddGreaterThan5(21) === true)
