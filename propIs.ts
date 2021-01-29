// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts'
import type { PH, Obj } from './utils/types.ts'
import type { Prop } from './prop.ts'
import { is } from './utils/is.ts'

// @types
type PropIs_1<T> = (type: string) => boolean

type PropIs_2<T> = (name: Prop) => boolean

type PropIs_3 = <T>(obj: Obj<T>) => boolean

// prettier-ignore
type PropIs_2_3 =
  & ((name: Prop, obj?: PH) => PropIs_3)
  & (<T>(name: PH, obj: Obj<T>) => PropIs_2<T>)
  & (<T>(name: Prop, obj: Obj<T>) => boolean)

// prettier-ignore
type PropIs_1_3 =
  & ((type: string, obj?: PH) => PropIs_3)
  & (<T>(type: PH, obj: Obj<T>) => PropIs_1<T>)
  & (<T>(type: string, obj: Obj<T>) => boolean)

// prettier-ignore
type PropIs_1_2<T> =
  & ((type: string, name?: PH) => PropIs_2<T>)
  & ((type: PH, name: Prop) => PropIs_1<T>)
  & ((type: string, name: Prop) => boolean)

// prettier-ignore
type PropIs =
  & ((type: string, name?: PH, obj?: PH) => PropIs_2_3)
  & ((type: PH, name: Prop, obj?: PH) => PropIs_1_3)
  & (<T>(type: PH, name: PH, obj: Obj<T>) => PropIs_1_2<T>)
  & ((type: string, name: Prop, obj?: PH) => PropIs_3)
  & (<T>(type: string, name: PH, obj: Obj<T>) => PropIs_2<T>)
  & (<T>(type: PH, name: Prop, obj: Obj<T>) => PropIs_1<T>)
  & (<T>(type: string, name: Prop, obj: Obj<T>,) => boolean)

function _propIs<T>(type: string, name: Prop, obj: Obj<T>) {
  return is(obj[name], type)
}

/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 *      Fae.propIs('Number', 'a', {a: 1, y: 2});  //=> true
 *      Fae.propIs('String', 'a', {a: 'foo'});    //=> true
 *      Fae.propIs('Number', 'a', {});            //=> false
 */
export const propIs: PropIs = curryN(3, _propIs)
