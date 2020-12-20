![](./assets/logo-160x160-2.png)


# Fae

[![CodeFactor](https://www.codefactor.io/repository/github/jozty/fae/badge)](https://www.codefactor.io/repository/github/jozty/fae)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/jozty/fae)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/jozty/fae/Tests?label=tests)
![GitHub](https://img.shields.io/github/license/jozty/fae)

Fae is a fully-fledged library that supports the functional style of programming in Deno and is inspired from [Ramda](https://ramdajs.com). This style provides many benefits like it never mutates input data and is used to create function pipelines. Fae functions are automatically curried. The data to be operated on is generally supplied last. It results in easy to build functions as sequences of simpler or atomic functions (pipelines), each of which transforms the data and passes it along to the next.

Fae provides over 110 functions that help programmers to write clean and concise code.

## Installing

_Deno allows you to directly import modules from URLs!_

To import and use the client in your file, add the following import statement:

```typescript
import * as Fae from 'https://deno.land/x/fae@v0.6.2/mod.ts'
```

Function usage and documentation can be found [here](https://fae.jozty.io/)

### Running tests

```typescript
deno test
# for coverage tests
deno test --coverage --unstable
```

### Usage

```typescript
import * as Fae from 'https://deno.land/x/fae@v0.6.2/mod.ts'

// arithmetic functions
Fae.add(10, 20)                                     // 30
Fae.add(10)(20)                                     // 30

const add20 = Fae.add(20)
add20(10)                                           // 30
add20(125)                                          // 145

// Expression - (2*5+5-10)/2
const double = Fae.multiply(2)
const half = Fae.divide(_, 2)
const add5 = Fae.add(5)
const subtract10 = Fae.subtract(_, 10)

half(subtract10(add5(double(15))))                  // 12.5
Fae.compose(half, subtract10, add5, double)(15)     // 12.5
Fae.pipe(double, add5, subtract10, half)(15)        // 12.5
```
**With lenses**
```typescript
import { lens, view, over, inc, set } from 'https://deno.land/x/fae@v0.6.2/mod.ts'

const array = [1, 2, 3, 4, 5, 6, 7, 8]

// gets element at index `0`
function getter(a: number[]) {
  return a[0]
}

// returns a new array by setting passed value `val` at index `0`
function setter(val: number, a: number[]) {
  const x = [...a]
  x[0] = val
  return x
}

const l = lens(getter, setter)

const viewResult = view(l, array)
const overResult = over(l, inc, array)
const setResult = set(l, 12, array)

console.log(viewResult)   // 1
console.log(overResult)   // [2, 2, 3, 4, 5, 6, 7, 8]
console.log(setResult)    // [12, 2, 3, 4, 5, 6, 7, 8]
```
