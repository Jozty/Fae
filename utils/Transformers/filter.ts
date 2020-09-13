import Transformer from "./transformers.ts"
import type { Func } from "../types.ts"

export default class FilterTransformer extends Transformer {
  constructor(f: Func, transformer: Transformer) {
    super(f, transformer)
  }
  step(result: any, input: any) {
    return this.f(input) ? this.transformer!.step(result, input) : result
  }
}
