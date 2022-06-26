// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { empty } from './empty.ts'
import { equals } from './equals.ts'

/**
 * Returns `true` if the given value is its type's empty value, `false`
 * otherwise.
 *
 *      Fae.isEmpty([1, 2, 3])   //=> false
 *      Fae.isEmpty([])          //=> true
 *      Fae.isEmpty('')          //=> true
 *      Fae.isEmpty(null)        //=> false
 *      Fae.isEmpty({})          //=> true
 */
export function isEmpty<T>(x: T) {
  return x != null && equals(x, empty(x))
}
