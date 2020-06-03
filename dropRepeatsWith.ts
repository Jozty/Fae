import curryN from './utils/curry_n.ts'
import { Predicate2, Curry2 } from './utils/types.ts'
import { dispatch } from './utils/dispatch.ts'
import DropRepeatsWithTransformer from './utils/Transformers/dropRepeatsWith.ts'

function _dropRepeatsWith<T>(predicate: Predicate2<T>, list: T[]) {
  const result = []
  const len = list.length
  if(len !== 0) result[0] = list[0]
  let last = result[0]

  for(let i = 0; i < len; i++) {
    if(!predicate(last, list[i])) result.push(list[i])
    last = list[i]
  }

  return result
}

const dispatched = dispatch(DropRepeatsWithTransformer, _dropRepeatsWith)

/**
 * Returns a new list without consecutively repeating elements.
 * Equality is decided by `predicate`
 * 
 * Acts as a transducer if a transformer is given in `list` position.
 * 
 * 
 */
export const dropRepeatsWith: Curry2<Predicate2, any[], any[]> = curryN(2, dispatched)
