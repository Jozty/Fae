import * as Fae from 'https://deno.land/x/fae/mod.ts'

/**  
 "either" takes two functions (func1 & func2) as arguments ,
  returns a function which when called upon gives logical "or" ("||") of the output of the input argument functions;
*/
const func1 = () => 3 > 5
const func2 = () => 1 === 1
const func3 = () => Fae.and(3)(2)
const func4 = () => Fae.or('', 0)

const eitherFunction1 = Fae.either(func1, func2)
const eitherFunction2 = Fae.either(func1, func3)
const eitherFunction3 = Fae.either(func4, func3)
const eitherFunction4 = Fae.either(func3, func2)
const eitherFunction5 = Fae.either(func1, func4)

console.assert(eitherFunction1() === true)
console.assert(eitherFunction2() === true)
console.assert(eitherFunction3() === true)
console.assert(eitherFunction4() === true)
console.assert(eitherFunction5() === false)

console.log('Examples successfully running')
