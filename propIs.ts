import curryN from './utils/curry_n.ts'
import type { PH, Obj } from './utils/types.ts'
import { is } from './utils/is.ts'

// @types
type PropIs_1<T> = ((type: string) => boolean) &
  ((type?: PH) => PropIs_1<T>)

type PropIs_2<T> = ((name: string) => boolean) &
  ((name?: PH) => PropIs_2<T>)

type PropIs_3 = (<T>(obj: Obj<T>) => boolean) &
  ((obj?: PH) => PropIs_3)

type PropIs_2_3 = (<T>(name: string, obj: Obj<T>) => boolean) &
  ((name: string, obj?: PH) => PropIs_3) &
  (<T>(name: PH, obj: Obj<T>) => PropIs_2<T>) &
  ((name?: PH, obj?: PH) => PropIs_2_3)

type PropIs_1_3 = (<T>(type: string, obj: Obj<T>) => boolean) &
  ((type: string, obj?: PH) => PropIs_3) &
  (<T>(type: PH, obj: Obj<T>) => PropIs_1<T>) &
  ((type?: PH, obj?: PH) => PropIs_1_3)

type PropIs_1_2<T> = ((type: string, name: string) => boolean) &
  ((type: string, name?: PH) => PropIs_2<T>) &
  ((type: PH, name: string) => PropIs_1<T>) &
  ((type?: PH, name?: PH) => PropIs_1_2<T>)

type PropIs = (<T>(
  type: string,
  name: string,
  obj: Obj<T>,
) => boolean) &
  ((type?: PH, name?: PH, obj?: PH) => PropIs) &
  ((type: string, name?: PH, obj?: PH) => PropIs_2_3) &
  ((type: PH, name: string, obj?: PH) => PropIs_1_3) &
  (<T>(type: PH, name: PH, obj: Obj<T>) => PropIs_1_2<T>) &
  ((type: string, name: string, obj?: PH) => PropIs_3) &
  (<T>(type: string, name: PH, obj: Obj<T>) => PropIs_2<T>) &
  (<T>(type: PH, name: string, obj: Obj<T>) => PropIs_1<T>)

function _propIs<T>(type: string, name: string, obj: Obj<T>) {
  return is(obj[name], type)
}

/**
 * Returns `true` if the specified object property(must be passed as string) is of the given type;
 * `false` otherwise.
 *
 *      Fae.propIs('Number', 'a', {a: 1, y: 2});  //=> true
 *      Fae.propIs('String', 'a', {a: 'foo'});    //=> true
 *      Fae.propIs('Number', 'a', {});            //=> false
 */
export const propIs: PropIs = curryN(3, _propIs)
