// TODO: make it more readable

import curryN from './utils/curry_n.ts'
import { Curry2, Obj } from './utils/types.ts'
import { isFunction } from './utils/is.ts'
import typ from './typ.ts'
import { getFunctionName } from './utils/get.ts'
import nth from './nth.ts'
import concat from './concat.ts'

// TODO: add to utils
function _has(prop: string, obj: Obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

// TODO: add to mod
function _keys(obj: Obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj)
}

// TODO: add to mod
function _last(arr: any[]) {
  return nth(-1, arr)
}


function _equals(a: any, b: any, stk1: any[], stk2: any[]) {
  if(Object.is(a, b)) return true
  const typeA = typ(a)
  if(typeA !== typ(b)) return false
  if(isFunction(a.equals) || isFunction(b.equals)) {
    return(
         isFunction(a.equals)
      && isFunction(b.equals)
      && a.equals(b)
      && b.equals(a)
    )
  }

  switch(typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object': {
      const c = a.constructor
      if(isFunction(c) && getFunctionName(c) === 'Promise') {
        return a === b
      }
      break
    }

    case 'Boolean':
    case 'Number':
    case 'String': {
      if (!(typeof a === typeof b && Object.is(a.valueOf(), b.valueOf()))) {
        return false
      }
      break
    }

    case 'Date': {
      if(!Object.is(a.valueOf(), b.valueOf())) return false
      break
    }

    case 'RegExp': {
      if (!(
        a.source === b.source
        && a.global === b.global
        && a.ignoreCase === b.ignoreCase
        && a.multiline === b.multiline
        && a.sticky === b.sticky
        && a.unicode === b.unicode
      )) {
        return false
      }
    }

    case 'Error':
      return a.name === b.name && a.message === b.message
    
    case 'Map': {
      if(a.size !== b.size) return false
    }
  }

  for(let i = stk1.length - 1; i >= 0; i--) {
    if(stk1[i] === a) {
      return stk2[i] === b
    }
  }

  const keysA = _keys(a)
  const keysB = _keys(b)
  if(keysA.length != keysB.length) return false

  const s1 = concat(stk1, [a]) as any[]
  const s2 = concat(stk2, [b]) as any[]

  for(let i = 0; i < keysA.length; i++) {
    const key = keysA[i]
    if(!(_has(key, b) && _equals(a[key], b[key], s1, s2))) return false
  }

  return true
}

function equals(a: any, b: any) {
  return _equals(a, b, [], [])
}

export default curryN(2, equals) as Curry2<any, any, boolean>
