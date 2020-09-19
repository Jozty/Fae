import Transformer from './transformers.ts'
import type { Func } from '../types.ts'
import { reduce } from '../../reduce.ts'

export default class DropLastWhileTransformer<
  T = any
> extends Transformer {
  private buffer: T[] = []
  constructor(f: Func, transformer: Transformer) {
    super(f, transformer)
  }

  result(acc: any) {
    return this.transformer!.result(acc)
  }

  step(result: any, input: any) {
    if (this.f(input)) return this.push(result, input)
    return this.flush(result, input)
  }

  flush(result: any, input: any) {
    result = reduce(this.transformer!.step, result, this.buffer)
    this.buffer = []
    return this.transformer!.step(result, input)
  }

  push(result: any, input: any) {
    this.buffer.push(input)
    return result
  }
}
