export { expect } from 'https://deno.land/x/expect/expect.ts'
export { assertStrictEquals, AssertionError } from 'https://deno.land/std@0.69.0/testing/asserts.ts'

type F = () => void | Promise<void>

export const tests: [string, F][] = []

export function describe(name: string, func: F) {
  func()
}

export function it(name: string, func: F) {
  tests.push([
    name,
    func,
  ])
}
