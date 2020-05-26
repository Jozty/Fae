import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function escapeRegEx(str: string) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function trim(str: string, t: string = '') {
  t = escapeRegEx(t)
  const regEx = new RegExp(`^(${t})+|(${t})+$`, 'g')
  return t ? str.replace(regEx, '') : str.trim()
}

export default curryN(2, trim) as Curry2<string, string, string>
