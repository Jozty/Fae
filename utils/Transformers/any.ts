import Transformer from "./transformers.ts"
import type { Func } from "../types.ts"
import reduced from "../reduced.ts"

export default class AnyTransformer extends Transformer {
  private any = false
  constructor(f: Func, transformer: Transformer) {
    super(f, transformer)
  }

  result(acc: any): any {
    if(!this.any) {
      acc = this.transformer!.step(acc, false)
    }
    return this.transformer!.result(acc)
  }

  step(result: any, input: any) {
    if(this.f(input)) {
      this.any = true
      result = reduced(
        this.transformer!.step(result, true)
      )
    }
    return result
  }
}
