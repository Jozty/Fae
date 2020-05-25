import { expect } from '../_describe.ts'

export function eq(actual: any, expected: any) {
  expect(actual).toEqual(expected)
}

export function thr(func: Function, expected: any) {
  try {
    func()
  } catch(e) {
    eq(e.message, expected)
  }
}
