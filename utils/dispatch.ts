import { Transformer } from "./transformers.ts"
import { Func } from "./types.ts"
import { isArray, isTransformer } from './is.ts'

export function dispatch(TR: typeof Transformer, func: Func) {
  return function(this: any, ...args: any[]) {
    if(args.length === 0) return func()

    const args2 = [...args]
    const obj = args2.pop()
    if(obj.transformer) {
      return new TR(args[0], obj)
    }
    return func.apply(this, args)
  }
}