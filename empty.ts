// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import {
  isArray,
  isString,
  isObject,
  isArguments,
} from './utils/is.ts'
import type { EmptyObj } from './utils/types.ts'

type EmptyReturnType<T> = T extends (infer U)[]
  ? U[]
  : T extends string
  ? ''
  : T extends EmptyObj
  ? EmptyObj
  : T

/**
 * Returns the empty value of its argument's type.
 *
 *      Fae.empty([1, 2, 3])     //=> []
 *      Fae.empty('unicorns')    //=> ''
 *      Fae.empty({x: 1, y: 2})  //=> {}
 */
export function empty<T>(x: T): EmptyReturnType<T> {
  if (x === null || x === undefined) return x as EmptyReturnType<T>;

  // @ts-ignore: types handled by EmptyReturnType
  if (isArray(x)) return []

  // @ts-ignore: types handled by EmptyReturnType
  if (isString(x)) return ''

  // @ts-ignore: types handled by EmptyReturnType
  if (isObject(x)) return {}

  if (isArguments(x)) {
    // @ts-ignore: types handled by EmptyReturnType
    return (function () {
      return arguments
    })()
  }

  // @ts-ignore: types handled by EmptyReturnType
  return null
}
