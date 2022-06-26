import type { Func } from './types.ts'
import Transformer from './Transformers/transformers.ts'

export function is(x: any, type: string) {
  return Object.prototype.toString.call(x) === `[object ${type}]`
}

export function isNumber(x: any): x is Number | number {
  return is(x, 'Number')
}

export function isString(x: any): x is string {
  return is(x, 'String')
}

export function isObject(x: any): x is Object {
  return is(x, 'Object')
}

export function isFunction(x: any): x is Func {
  return is(x, 'Function') || typeof x === 'function'
}

export function isInteger(x: any): x is number {
  return Number.isInteger(x)
}

export function isArray<T = any>(x: unknown): x is Array<T> {
  return Array.isArray(x)
}

export function isArrayLike<T = any>(x: any): x is ArrayLike<T> {
  if (!x) return false
  if (isArray(x)) return true
  if (x.length) {
    if (x.length === 0) return true
    if (
      x.length > 0 &&
      x.hasOwnProperty(0) &&
      x.hasOwnProperty(x.length - 1)
    )
      return true
  }
  return false
}

export function isIterable<T = any>(x: any): x is Iterable<T> {
  return Symbol.iterator in Object(x)
}

export function isIterator<T = any>(x: any): x is Iterator<T> {
  return x && isFunction(x.next)
}

export function isTransformer(s: any): s is Transformer {
  return s instanceof Transformer
}

export function isUndefinedOrNull(x: any): x is undefined | null {
  return x === void 0 || x === null || x === undefined
}
export function isNotUndefinedOrNull(x: any) {
  return !isUndefinedOrNull(x)
}

export function isArguments(x: any) {
  return is(x, 'Arguments')
}
