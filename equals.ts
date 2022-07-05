// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { Curry2, Obj } from './utils/types.ts';
import { isFunction } from './utils/is.ts';
import { typ } from './typ.ts';
import { getFunctionName } from './utils/get.ts';
import { nth } from './nth.ts';
import { concat } from './concat.ts';
import has from './utils/has.ts';

// TODO: add to mod
function _keys(obj: Obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}

// TODO: add to mod
function _last(arr: any[]) {
  return nth(-1, arr);
}

/**
 * Check equality of `a` and `b` by custom implentation provided
 * by `a` and `b`
 */
function _isEqualByCustomImpl(a: any, b: any) {
  return (
    isFunction(a.equals) &&
    isFunction(b.equals) &&
    a.equals(b) &&
    b.equals(a)
  );
}

function _checkEnumerableProps(
  a: any,
  b: any,
  stackA: any[],
  stackB: any[],
) {
  // check recursive objects
  for (let i = stackA.length - 1; i >= 0; i--) {
    if (stackA[i] === a) {
      return stackB[i] === b;
    }
  }

  const keysA = _keys(a);
  const keysB = _keys(b);
  if (keysA.length != keysB.length) return false;

  const s1 = concat(stackA, [a]) as any[];
  const s2 = concat(stackB, [b]) as any[];

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!(has(b, key) && _equals(a[key], b[key], s1, s2))) {
      return false;
    }
  }
  return true;
}

function _checkObjects(
  a: IArguments | any[] | Object,
  b: IArguments | any[] | Object,
  stackA: any[],
  stackB: any[],
) {
  const c = a.constructor;
  if (isFunction(c) && getFunctionName(c) === 'Promise') {
    return a === b;
  }
  return _checkEnumerableProps(a, b, stackA, stackB);
}

function _checkPrimitives(
  a: Boolean | String | Number | boolean | string | number,
  b: Boolean | String | Number | boolean | string | number,
  stackA: any[],
  stackB: any[],
) {
  if (typeof a === typeof b && Object.is(a.valueOf(), b.valueOf())) {
    return _checkEnumerableProps(a, b, stackA, stackB);
  }
  return false;
}

function _checkDate(a: Date, b: Date, stackA: any[], stackB: any[]) {
  if (Object.is(a.valueOf(), b.valueOf())) {
    return _checkEnumerableProps(a, b, stackA, stackB);
  }
  return false;
}

function _checkRegex(
  a: RegExp,
  b: RegExp,
  stackA: any[],
  stackB: any[],
) {
  if (
    a.source === b.source &&
    a.global === b.global &&
    a.ignoreCase === b.ignoreCase &&
    a.multiline === b.multiline &&
    a.sticky === b.sticky &&
    a.unicode === b.unicode
  ) {
    return _checkEnumerableProps(a, b, stackA, stackB);
  }
  return false;
}

function _checkError(
  a: Error,
  b: Error,
  stackA: any[],
  stackB: any[],
) {
  if (a.name === b.name && a.message === b.message) {
    return _checkEnumerableProps(a, b, stackA, stackB);
  }
  return false;
}

function _checkMaps(
  a: Map<any, any>,
  b: Map<any, any>,
  stackA: any[],
  stackB: any[],
) {
  if (a.size !== b.size) {
    return false;
  }

  stackA = stackA.concat([a]);
  stackB = stackB.concat([b]);

  if (!_checkEnumerableProps(a, b, stackA, stackB)) return false;

  const keysA = [...a.keys()].sort();
  const keysB = [...b.keys()].sort();

  for (let i = 0; i < keysA.length; i++) {
    const keyA = keysA[i];
    const keyB = keysB[i];

    for (let i = stackA.length - 1; i >= 0; i--) {
      if (stackA[i] === keyA) {
        return stackB[i] === keyB;
      }
    }
    // check equality of keys
    if (!_equals(keyA, keyB, stackA, stackB)) return false;

    // check equality of values
    if (!_equals(a.get(keyA), b.get(keyB), stackA, stackB)) {
      return false;
    }
  }
  return true;
}

function _checkSets(
  a: Set<any>,
  b: Set<any>,
  stackA: any[],
  stackB: any[],
) {
  if (a.size !== b.size) return false;

  stackA = stackA.concat([a]);
  stackB = stackB.concat([b]);

  if (!_checkEnumerableProps(a, b, stackA, stackB)) return false;

  const valuesA = [...a.values()].sort();
  const valuesB = [...b.values()].sort();

  for (let i = 0; i < valuesA.length; i++) {
    const valueA = valuesA[i];
    const valueB = valuesB[i];

    for (let i = stackA.length - 1; i >= 0; i--) {
      if (stackA[i] === valueA) return stackB[i] === valueB;
    }

    if (!_equals(valueA, valueB, stackA, stackB)) return false;
  }
  return true;
}

function _equals(
  a: any,
  b: any,
  stackA: any[] = [],
  stackB: any[] = [],
) {
  if (Object.is(a, b)) return true;
  const typeA = typ(a);
  const typeB = typ(b);

  // types are not same
  if (typeA !== typeB) return false;

  // if any of the object has custom implementation of equals
  if (isFunction(a.equals) || isFunction(b.equals)) {
    return _isEqualByCustomImpl(a, b);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      return _checkObjects(a, b, stackA, stackB);

    case 'Boolean':
    case 'Number':
    case 'String':
      return _checkPrimitives(a, b, stackA, stackB);

    case 'Date':
      return _checkDate(a, b, stackA, stackB);

    case 'RegExp':
      return _checkRegex(a, b, stackA, stackB);

    case 'Error':
      return _checkError(a, b, stackA, stackB);

    case 'Map':
      return _checkMaps(a, b, stackA, stackB);

    case 'Set':
      return _checkSets(a, b, stackA, stackB);

    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      return _checkEnumerableProps(a, b, stackA, stackB);
  }

  return false;
}

export const equals: Curry2<any, any, boolean> = curryN(2, _equals);
