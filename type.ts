import slice from "./slice.ts"
import { AllTypes } from "./utils/types.ts"

// TODO: (singla-shivam) export default

/** Gives a single-word string description of the (native) type of a value.
 * The returned types are of type `AllTypes`
 * @function
 * 
 *      Fae.type({}); //=> "Object"
 *      Fae.type(1); //=> "Number"
 *      Fae.type(false); //=> "Boolean"
 *      Fae.type('s'); //=> "String"
 *      Fae.type(null); //=> "Null"
 *      Fae.type([]); //=> "Array"
 *      Fae.type(/[A-z]/); //=> "RegExp"
 *      Fae.type(() => {}); //=> "Function"
 *      Fae.type(undefined); //=> "Undefined"
*/
export function type(a: any): AllTypes {
  if(a === null) return 'Null'
  if(a === undefined) return 'Undefined'
  return slice(8, -1, Object.prototype.toString.call(a)) as unknown as AllTypes
}
