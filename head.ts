import { nth } from './nth.ts'

/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 *      Fae.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      Fae.head([]); //=> undefined
 *
 *      Fae.head('abc'); //=> 'a'
 *      Fae.head(''); //=> ''
 */
export const head = nth(0)
