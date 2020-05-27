import { Func } from "./types.ts"

export class Transformer {
  protected transformer?: Transformer
  protected f: Func
  static transform = Symbol('Transformer')
  constructor(f: Func, transformer?: Transformer) {
    this.transformer = transformer
    this.f = f
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

export class MapTransformer extends Transformer {
  constructor(f: Func, transformer: Transformer) {
    super(f, transformer)
  }
}

export class FilterTransformer extends Transformer {
  constructor(f: Func, transformer: Transformer) {
    super(f, transformer)
  }
  step(result: any, input: any) {
    return this.f(input) ? this.transformer!.step(result, input) : result
  }
}
