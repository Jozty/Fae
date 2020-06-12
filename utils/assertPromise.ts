import { isFunction } from './is.ts'

export default function _assertPromise(name: any, p: any) {
  if (p == null || !isFunction(p.then)) {
    throw new TypeError('`' + name + '` expected a Promise, received ' + p.toString())
  }
}