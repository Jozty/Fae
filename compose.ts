import pipe from "./pipe.ts"
import { Func } from "./utils/types.ts"
import reverse from "./reverse.ts"

export default function compose(...functions: Func[]) {
  return pipe.apply(this, reverse(functions))
}