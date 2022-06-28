// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts'
import type { Func } from './utils/types.ts'
import { liftN } from './liftN.ts'
import { getFunctionLength } from './utils/get.ts'

// @types
type Lift = (f: Func) => Func

function _lift(f: Func) {
  return liftN(getFunctionLength(f), f)
}

export const lift: Lift = curryN(1, _lift)
