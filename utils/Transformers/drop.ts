import Transformer from './transformers.ts'

export default class DropTransformer extends Transformer {
  private n: number
  constructor(n: number, transformer: Transformer) {
    super(null as any, transformer)
    this.n = n
  }

  step(result: any, input: any) {
    if (this.n > 0) {
      this.n--
      return result
    }
    return this.transformer!.step(result, input)
  }
}
