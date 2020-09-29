import type { PH, Predicate1, FuncArr1 } from './utils/types.ts'
import curryN from './utils/curry_n.ts'

// @types
type When_1<T, R> = ((predicate: Predicate1<T>) => T | R)

type When_2<T> = (<R>(func: FuncArr1<T, R>) => T | R)

type When_3<T, R> = ((value: T) => T | R)

// prettier-ignore
type When_2_3<T> = 
  & (<R>(func: FuncArr1<T, R>, value?: PH) => When_3<T, R>)
  & ((func: PH, value: T) => When_2<T>)
  & (<R>(func: FuncArr1<T, R>, value: T) => T | R)

// prettier-ignore
type When_1_3<T, R> = ((predicate: Predicate1<T>, value: T) => T | R)
  & ((predicate: Predicate1<T>, value?: PH) => When_3<T, R>)
  & ((predicate: PH, value: T) => When_1<T, R>)
  & ((predicate: Predicate1<T>, value: T) => T | R)

// prettier-ignore
type When_1_2<T> = 
  & ((predicate: Predicate1<T>, func?: PH) => When_2<T>)
  & (<R>(predicate: PH, func: FuncArr1<T, R>) => When_1<T, R>)
  & (<R>(predicate: Predicate1<T>, func: FuncArr1<T, R>) => T | R)

// prettier-ignore
type When = 
  & (<T>(predicate: Predicate1<T>, func?: PH, value?: PH) => When_2_3<T>)
  & (<T, R>(predicate: PH, func: FuncArr1<T, R>, value?: PH) => When_1_3<T, R>)
  & (<T>(predicate: PH, func: PH, value: T) => When_1_2<T>)
  & (<T, R>(predicate: Predicate1<T>, func: FuncArr1<T, R>, value?: PH) => When_3<T, R>)
  & (<T>(predicate: Predicate1<T>, func: PH, value: T) => When_2<T>)
  & (<T, R>(predicate: PH, func: FuncArr1<T, R>, value: T) => When_1<T, R>)
  & (<T, R>(predicate: Predicate1<T>, func: FuncArr1<T, R>, value: T) => T | R)

function _when<T, R>(
  predicate: Predicate1<T>,
  func: FuncArr1<T, R>,
  value: T,
): T | R {
  return predicate(value) ? func(value) : value
}

/**
 * Applies `func` on `value` if the test `predicate` is true and returns it;
 * returns `value` otherwise.
 *
 *
 *      const truncate = Fae.when(
 *        Fae.propSatisfies(Fae.gt(Fae._, 10), 'length'),
 *        Fae.pipe(Fae.take(10), Fae.append('…'), Fae.join(''))
 *      );
 *      truncate('12345');         //=> '12345'
 *      truncate('0123456789ABC'); //=> '0123456789…'
 */
export const when: When = curryN(3, _when)
