import Transformer from './transformers.ts';
import type { Func } from '../types.ts';

export default class MapTransformer extends Transformer {
  constructor(f: Func, transformer: Transformer) {
    super(f, transformer);
  }
}
