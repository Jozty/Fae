import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

type Predicate<T> = (a: T) => boolean

/**
 * Return `true` if all the elements of the functor match `predicate`
 * `false` otherwise
 */
function all<T>(predicate: Predicate<T>, functor: ArrayLike<T>) {
    let index = 0
    while(index < functor.length){
        if(!predicate(functor[index])){
            return false
        }
        index++
    }
    return true
}

export default curryN(2, all) as Curry2<Predicate<any>, Array<any>, boolean>
