import { Curry1 } from './utils/types.ts'
import curryN from './utils/curry_n.ts'
import { empty } from './empty.ts';
import { equals } from './equals.ts';

function _isEmpty(x: any) {
  return x != null && equals(x, empty(x));
}

export const isEmpty: Curry1<any, boolean> = curryN(1, _isEmpty)
