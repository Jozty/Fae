import Transformer from "./transformers.ts"
import reduced from "../reduced.ts"

export default class TakeTransformer extends Transformer {
  private i: number
  private n: number
  constructor(n: number, transformer: Transformer) {
    super(null as any, transformer)
    this.n = n
    this.i = 0
  }

  step(result: any, input: any) {
    this.i++
    const ret = this.n === 0 ? result : this.transformer!.step(result, input)
    return(
      this.n >= 0 && this.i >= this.n
        ? reduced(ret)
        : ret
    )
  }
}
