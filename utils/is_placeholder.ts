import { _ } from './constants.ts';

export function isPlaceHolder(a: unknown) {
  return a === _;
}

export function areAllPlaceHolder(...args: unknown[]) {
  return args.every(isPlaceHolder);
}
