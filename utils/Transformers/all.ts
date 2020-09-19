import Transformer from './transformers.ts'
import type { Func } from '../types.ts'
import reduced from '../reduced.ts'

export default class AllTransformer extends Transformer {
  private all = true
  constructor(f: Func, transformer: Transformer) {
    super(f, transformer)
  }

  result(acc: any): any {
    if (this.all) {
      acc = this.transformer!.step(acc, true)
    }
    return this.transformer!.result(acc)
  }

  step(result: any, input: any) {
    if (!this.f(input)) {
      this.all = false
      result = reduced(this.transformer!.step(result, false))
    }
    return result
  }
}
