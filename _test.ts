import * as R from './mod.ts'

let t = R.pipe(
  R.map((a: string) => a.toUpperCase()),
  R.map(R.reverse),
  R.reverse
)

let x = ['abc', 'def', 'ghi', 'jkl']

console.log(t(x))

function *it(i = 0) {
  while(i++ <= 5) yield i
}

console.log(R.reduce(R.add)(it(), 0))
