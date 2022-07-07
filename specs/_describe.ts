export { expect } from 'https://deno.land/x/expect@v0.2.6/expect.ts';
export {
  AssertionError,
  assertStrictEquals,
} from 'https://deno.land/std@0.69.0/testing/asserts.ts';

type F = () => void | Promise<void>;

export const tests: [string, F][] = [];

export function describe(_name: string, func: F) {
  func();
}

export function it(name: string, func: F) {
  Deno.test(name, func);
  // tests.push([
  //   name,
  //   func,
  // ])
}
