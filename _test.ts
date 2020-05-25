import * as R from './mod.ts'

let t = R.pipe(
  R.map((a: string) => a.toUpperCase()),
  R.map((b: string) => b.split('').reverse().join('')),
)

let x = ['abc', 'def', 'ghi', 'jkl']

console.log(t(x))

console.log(R.transduce(t, R.flip(R.append), [], x))
