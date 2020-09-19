import Transformer from './transformers.ts'

export default class ApertureTransformer<
  T = any
> extends Transformer {
  private n: number
  private i: number = 0
  private buffer: T[]
  private full = false
  constructor(n: number, transformer: Transformer) {
    super(null as any, transformer)
    this.n = n
    this.buffer = new Array(n)
  }

  step(result: any, input: any) {
    this.store(input)
    return this.full
      ? this.transformer!.step(result, this.copy)
      : result
  }

  store(input: any) {
    this.buffer[this.i++] = input
    if (this.i === this.n) {
      this.i = 0
      this.full = true
    }
  }

  get copy() {
    return this.buffer
      .slice(this.i)
      .concat(this.buffer.slice(0, this.i))
  }
}
