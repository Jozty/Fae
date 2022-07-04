import { _ } from './constants.ts';

export function isPlaceHolder(a: any) {
  return a === _;
}

export function areAllPlaceHolder(...args: any[]) {
  return args.every(isPlaceHolder);
}
