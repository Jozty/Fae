import { Func } from "../types.ts"

export default class Transformer {
  protected transformer?: Transformer
  protected f: Func
  static transform = Symbol('Transformer')
  constructor(f: Func, transformer?: Transformer) {
    this.transformer = transformer
    this.f = f
    this.init = this.init.bind(this)
    this.result = this.result.bind(this)
    this.step = this.step.bind(this)
  }

  init(): any {
    return this.transformer!.init()
  }
  result(acc: any): any {
    return this.transformer ? this.transformer.result(acc) : acc
  }
  step(result: any, input: any): any {
    if(this.transformer) return this.transformer.step(result, this.f(input))
    return this.f(result, input)
  }
}

export class ReducedTransformer<T> {
  private _value: T
  constructor(value: T) {
    this._value = value
  }
  get value() {
    return this._value
  }
}
