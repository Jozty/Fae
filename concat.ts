import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"


function concat(set1: Array<any>, set2: Array<any>) {
    set1 = set1 || []
    set2 = set2 || []
    let index
    let length1 = set1.length
    let length2 = set2.length
    let result = []
    
    index=0
    while (index < length1) {
      result[result.length] = set1[index]
      index += 1
    }
    index = 0
    while (index < length2) {
      result[result.length] = set2[index]
      index += 1
    }
    return result
  }

  export default <Curry2<Array<any>, Array<any>, Array<any>>>curryN(2,concat)