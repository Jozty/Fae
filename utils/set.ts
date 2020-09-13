import type { Func } from "./types.ts"
import { FUNCTION_LENGTH } from "./constants.ts"

export function setFunctionLength(func: Func, length: number) {
  func[FUNCTION_LENGTH] = length
}