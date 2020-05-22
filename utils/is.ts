export function is(x: any, type: string) {
  return Object.prototype.toString.call(x) === `[object ${type}]`
}

export function isNumber(x: any): x is Number {
  return is(x, 'Number')
}

export function isString(x: any): x is String {
  return is(x, 'String')
}

export function isObject(x: any) {
  return is(x, 'Object')
}

export function isFunction(x: any) {
  return is(x, 'Function') || typeof x === 'function'
}

export function isInteger(x: number) {
  return Number.isInteger(x)
}

export function isArray<T = any>(x: any): x is Array<T> {
  return Array.isArray(x)
}

export function isArrayLike<T = any>(x: any): x is ArrayLike<T> {
  if(!x) return false
  if(!isObject(x)) return false
  if(isArray(x)) return true
  if(x.length){
    if(x.length === 0) return true
    if(x.length > 0 && x.hasOwnProperty(0) && x.hasOwnProperty(1)) return true
  }
  return false
}

export function isIterable<T = any>(x: any): x is Iterable<T> {
  return Symbol.iterator in Object(x) || isFunction(x.next)
}

export function isIterator<T = any>(x: any): x is Iterator<T> {
  return isFunction(x.next)
}
