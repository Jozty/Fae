import _concat from './utils/concat.ts';
import curryN from './utils/curry_n.ts';
import map from './map.ts';
import add from './add.ts'
import { Func } from './utils/types.ts';
import { getFunctionLength } from "./utils/get.ts"


var addIndex = curryN(function addIndex(fn:Func) {
  return curryN(getFunctionLength(fn)!, function(this:any) {
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
},null);

export default addIndex;