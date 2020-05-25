export default function _concat(set1:Array<any>, set2:Array<any>) {
    set1 = set1 || []
    set2 = set2 || []
    let idx
    let len1 = set1.length
    let len2 = set2.length
    let result = []
    
    idx=0
    while (idx < len1) {
      result[result.length] = set1[idx]
      idx += 1
    }
    idx = 0
    while (idx < len2) {
      result[result.length] = set2[idx]
      idx += 1
    }
    return result
  }