import type { Func } from './types.ts';
import { FUNCTION_LENGTH } from './constants.ts';

export function setFunctionLength<A extends unknown[], R, This>(func: Func<A, R, This>, length: number) {
  func[FUNCTION_LENGTH] = length;
}
