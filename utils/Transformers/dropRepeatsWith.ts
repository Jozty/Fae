import Transformer from "./transformers.ts"
import { Predicate2 } from "../types.ts"
import equals from "../../equals.ts"

export default class DropRepeatsWithTransformer<T = any> extends Transformer {
  private last: T
  private seenFirst = false
  constructor(pred: Predicate2<T>, transformer: Transformer) {
    super(null as any, transformer)
    this.f = pred
    this.last = undefined as any
  }

  step(result: any, input: any) {
    let same = false
    
    if(!this.seenFirst) this.seenFirst = true
    else if(this.f(this.last, input)) same = true

    this.last = input

    return same ? result : this.transformer!.step(result, input)
  }
}

export class DropRepeatsTransformer<T = any> extends DropRepeatsWithTransformer {
  constructor(transformer: Transformer) {
    super(equals, transformer)
  }
}
