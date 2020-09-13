import Transformer from "./transformers.ts"
import type { Func } from "../types.ts"

export default class FindLastIdxTransformer extends Transformer {
  private last = -1
  private i = 0
  constructor(f: Func, transformer: Transformer) {
    super(f, transformer)
    this.last = -1
  }

  step(result: any, input: any) {
    if(this.f(input)) {
      this.last = this.i
    }
    this.i++
    return result
  }

  result(result: any) {
    return this.transformer!.result(
      this.transformer!.step(result, this.last)
    )
  }
}
