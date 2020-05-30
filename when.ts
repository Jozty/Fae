import { Func, Curry3 } from './utils/types.ts'
import curryN from './utils/curry_n.ts'

type Predicate<T> = (a: T) => boolean

function when<T>(predicate: Predicate<T>, func: Func, value: T) {
  return predicate(value) ? func(value) : value
}

/** Applies `func` on `value` if the test `predicate` is true and returns it;
 * returns `value` otherwise.
 * @function
 * 
 *      const truncate = Fae.when(
 *        Fae.propSatisfies(Fae.gt(Fae._, 10), 'length'),
 *        Fae.pipe(Fae.take(10), Fae.append('…'), Fae.join(''))
 *      );
 *      truncate('12345');         //=> '12345'
 *      truncate('0123456789ABC'); //=> '0123456789…'
 */
export default curryN(3, when) as Curry3<Predicate<any>, Func, any, any>
