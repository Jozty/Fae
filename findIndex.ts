import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

// TODO: (singla-shivam) Add transformer
// TODO: (ch-shubham) Add Support for Predicates

function _findIndex<T>(arr: Array<T>, element: T){
    for(let i = 0; i <= arr.length; i++){
        if(element === arr[i]) return i
    }
    return -1
}

/**
 * Takes in Array and Element as its 2 parameters
 * Return the 1st index If element is matched or -1 is unmatched. 
 */
export const findIndex: Curry<typeof _findIndex> = curryN(2, _findIndex)
