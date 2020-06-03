![](./assets/logo-160x160-2.png)
# Fae
A functional library for Deno inspired from [Ramda](https://ramdajs.com).

## Installing
*Deno allows you to directly import modules from URLs!*

To import and use the client in your file, add the following import statement:
```typescript
import * as Fae from 'https://deno.land/x/fae/mod.ts'
```

Function usage and documentation can be found [here](https://doc.deno.land/https/deno.land/x/fae/mod.ts)

### Running tests
```typescript
deno run --allow-read --allow-net specs/_run.ts
```
### Usage
```typescript
import * as Fae from 'https://deno.land/x/fae/mod.ts'
Fae.add(10, 20) // => 30
Fae.add(10)(20) // => 30
let add20 = Fae.add(20)
add20(10) // => 30
add20(125) // => 145
Fae.addIndex(Fae.map)(Fae.add)([10, 20, 30]) // => [10, 21, 32]

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const transformer = Fae.pipe(
  Fae.map(inc),
  Fae.filter(even),
  Fae.take(3)
)
transformer(array) // [2, 4, 6]
```
