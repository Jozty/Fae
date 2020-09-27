import {
  expect,
  assertStrictEquals,
  AssertionError,
} from '../_describe.ts'

export function eq<T>(actual: T, expected: T) {
  expect(actual).toEqual(expected)
}

export function strictEq(actual: any, expected: any) {
  assertStrictEquals(actual, expected)
}
export function strictNotEq(actual: any, expected: any) {
  if (actual !== expected) return
  throw new AssertionError('The objects passes has same reference')
}

export function thr(func: Function, expected: any) {
  let f = true
  try {
    func()
    f = false
  } catch (e) {
    eq(e.message, expected)
  }
  if (!f) throw new Error('No Error Throw')
}
