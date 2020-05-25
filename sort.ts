import _curry2 from './utils/curry_2.ts';

var sort = _curry2(function sort(comparator:any, list:Array<number>) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});

export default sort;