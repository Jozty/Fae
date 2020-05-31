import Transformer from "./transformers.ts"
import { Func } from "../types.ts"

export default class DropWhileTransformer extends Transformer {
  private skippingDone = false
  constructor(f: Func, transformer: Transformer) {
    super(f, transformer)
  }

  step(result: any, input: any) {
    if(!this.skippingDone) {
      if(this.f(input)) return result
      this.skippingDone = true
    }
    return this.transformer!.step(result, input)
  }
}
