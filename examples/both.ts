import * as Fae from 'https://deno.land/x/fae/mod.ts'

/**  
 "both" takes two functions (func1 & func2) as arguments ,
  returns a function which when called upon gives logical "and" ("&&") of the output of the input argument functions;
*/
const func1 = () => 3 > 5
const func2 = () => 1 === 1
const func3 = () => Fae.and(3)(2)
const func4 = () => Fae.or('', 0)

const bothFunction1 = Fae.both(func1, func2)
const bothFunction2 = Fae.both(func1, func3)
const bothFunction3 = Fae.both(func4, func3)
const bothFunction4 = Fae.both(func3, func2)
const bothFunction5 = Fae.both(func1, func4)

console.assert(bothFunction1() === false)
console.assert(bothFunction2() === false)
console.assert(bothFunction3() === false)
console.assert(bothFunction4() === true)
console.assert(bothFunction5() === false)

console.log("Examples successfully running");