import Transformer from "./transformers.ts"
import { Func } from "../types.ts"

export default class TapTransformer extends Transformer {
  constructor(f: Func, transformer: Transformer) {
    super(f, transformer)
  }

  step(result: any, input: any) {
    this.f(input)
    return this.transformer ? this.transformer.step(result, input) : result
  }
}