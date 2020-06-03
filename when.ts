import { Func, Curry3 } from './utils/types.ts'
import curryN from './utils/curry_n.ts'

type Predicate<T> = (a: T) => boolean

function _when<T>(predicate: Predicate<T>, func: Func, value: T) {
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
export const when: Curry3<Predicate<any>, Func, any, any> = curryN(3, _when)
