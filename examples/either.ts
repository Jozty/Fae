import * as Fae from 'https://deno.land/x/fae/mod.ts'

const is5 = Fae.equals(5)
const isLessThan13 = (x: number) => x < 13
const isOdd = (y: number) => y % 2 !== 0
const isLessThan1 = (x: number) => x < 1

const is5OrLessThan13 = Fae.either(
  is5,
  isLessThan13,
)
const isOddOrEquals5 = Fae.either(is5, isOdd)
const oddOrLessThan1 = Fae.either(isOdd, isLessThan1)

console.assert(is5OrLessThan13(12) === true)
console.assert(isOddOrEquals5(4) === false)
console.assert(oddOrLessThan1(21) === true)

console.log('Example ran successfully')
