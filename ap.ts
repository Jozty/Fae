import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"
import concat from './concat.ts';
import reduce from './reduce.ts';
import map from './map.ts';

function ap(applyF: any, applyX: any) {
  return (
    typeof applyF.ap === 'function'
        ? applyF.ap(applyX)
        : typeof applyF === 'function'
          ? function(x: any) { return applyF(x)(applyX(x)) }
          //TODO: (singla-shivam) - fix type error
          //@ts-ignore
          : reduce(function(acc, f) { return concat(acc, map(f, applyX)) }, [], applyF)
  );
}


export default curryN(2, ap) as Curry2<number, number, ReturnType<typeof ap>>
