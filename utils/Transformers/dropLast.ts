import Transformer from './transformers.ts'

export default class DropLastTransformer extends Transformer {
  private n: number
  private unTracked: any[]
  private i = 0
  private full = false
  constructor(n: number, transformer: Transformer) {
    super(null as any, transformer)
    this.n = n
    this.unTracked = new Array(n)
  }

  result(acc: any) {
    return this.transformer!.result(acc)
  }

  step(result: any, input: any) {
    if (this.full) {
      result = this.transformer!.step(result, this.unTracked[this.i])
    }
    this.store(input)
    return result
  }

  private store(input: any) {
    this.unTracked[this.i++] = input
    if (this.i === this.unTracked.length) {
      this.i = 0
      this.full = true
    }
  }
}
