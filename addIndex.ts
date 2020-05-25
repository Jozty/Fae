import _concat from './utils/concat.ts';
import _curry1 from './utils/curry_1.ts';
import curryN from './utils/curry_n.ts';
import map from './map.ts';
import add from './add.ts'
import { Func } from './utils/types.ts';

var addIndex = _curry1(function addIndex(fn:Func) {
  return curryN(fn.length, function(this:any) {
    var index = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = [...arguments];
    args[0] = function() {
      var result = origFn.apply(this, _concat([...arguments], [index, list]));
      index += 1;
      return result;
    };
    return fn.apply(this,args);
  });
});



let arr=[10,102,103];
console.log(addIndex(map)(add,arr))


export default addIndex;