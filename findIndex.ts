/*
 * Takes in Array and Element as its 2 parameters
 * Return the 1st index If element is matched or -1 is unmatched.
*/
import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

// TODO: (singla-shivam) Add transformer
// TODO: (ch-shubham) Add Support for Predicates

function findIndex(arr: Array<any>, element: any){
    for(let i = 0; i <= arr.length; i++){
        if(element === arr[i]) return i
    }
    return -1
}

export default curryN(2, findIndex) as Curry2<Array<any>, any, any>
