import Transformer from "./transformers.ts"
import type { Func } from "../types.ts"
import reduced from "../reduced.ts"

export default class FindTransformer extends Transformer {
  private found = false
  constructor(f: Func, transformer: Transformer) {
    super(f, transformer)
  }

  step(result: any, input: any) {
    if(this.f(input)) {
      this.found = true
      result = reduced(this.transformer!.step(result, input))
    }
    return result
  }

  result(result: any) {
    if (!this.found) result = this.transformer!.step(result, void 0)
    return this.transformer!.result(result)
  }
}
