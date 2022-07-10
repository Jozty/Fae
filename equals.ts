// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { Any, Curry2, Func, Obj } from './utils/types.ts';
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
function _last(arr: unknown[]) {
  return nth(-1, arr);
}

/**
 * Check equality of `a` and `b` by custom implentation provided
 * by `a` and `b`
 */
function _isEqualByCustomImpl(a: Any, b: Any) {
  return (
    isFunction(a.equals) &&
    isFunction(b.equals) &&
    a.equals(b) &&
    b.equals(a)
  );
}

function _checkEnumerableProps(
  a: Any,
  b: Any,
  stackA: unknown[],
  stackB: unknown[],
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

  const s1 = concat(stackA, [a]) as unknown[];
  const s2 = concat(stackB, [b]) as unknown[];

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!(has(b, key) && _equals(a[key], b[key], s1, s2))) {
      return false;
    }
  }
  return true;
}

function _checkObjects(
  a: Any,
  b: Any,
  stackA: unknown[],
  stackB: unknown[],
) {
  const c = a.constructor;
  if (isFunction(c as Func) && getFunctionName(c as Func) === 'Promise') {
    return a === b;
  }
  return _checkEnumerableProps(a, b, stackA, stackB);
}

function _checkPrimitives(
  a: Boolean | String | Number | boolean | string | number,
  b: Boolean | String | Number | boolean | string | number,
  stackA: unknown[],
  stackB: unknown[],
) {
  if (typeof a === typeof b && Object.is(a.valueOf(), b.valueOf())) {
    return _checkEnumerableProps(a, b, stackA, stackB);
  }
  return false;
}

function _checkDate(a: Date, b: Date, stackA: unknown[], stackB: unknown[]) {
  if (Object.is(a.valueOf(), b.valueOf())) {
    return _checkEnumerableProps(a, b, stackA, stackB);
  }
  return false;
}

function _checkRegex(
  a: RegExp,
  b: RegExp,
  stackA: unknown[],
  stackB: unknown[],
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
  stackA: unknown[],
  stackB: unknown[],
) {
  if (a.name === b.name && a.message === b.message) {
    return _checkEnumerableProps(a, b, stackA, stackB);
  }
  return false;
}

function _checkMaps(
  a: Map<unknown, unknown>,
  b: Map<unknown, unknown>,
  stackA: unknown[],
  stackB: unknown[],
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
  a: Set<unknown>,
  b: Set<unknown>,
  stackA: unknown[],
  stackB: unknown[],
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
  a: unknown,
  b: unknown,
  stackA: unknown[] = [],
  stackB: unknown[] = [],
) {
  if (Object.is(a, b)) return true;
  const typeA = typ(a);
  const typeB = typ(b);

  // types are not same
  if (typeA !== typeB) return false;

  // if unknown of the object has custom implementation of equals
  if (isFunction((a as Any).equals) || isFunction((b as Any).equals)) {
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
      return _checkPrimitives(
        a as boolean | string | number,
        b as boolean | string | number,
        stackA,
        stackB,
      );

    case 'Date':
      return _checkDate(a as Date, b as Date, stackA, stackB);

    case 'RegExp':
      return _checkRegex(a as RegExp, b as RegExp, stackA, stackB);

    case 'Error':
      return _checkError(a as Error, b as Error, stackA, stackB);

    case 'Map':
      return _checkMaps(
        a as Map<unknown, unknown>,
        b as Map<unknown, unknown>,
        stackA,
        stackB,
      );

    case 'Set':
      return _checkSets(a as Set<unknown>, b as Set<unknown>, stackA, stackB);

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

export const equals: Curry2<unknown, unknown, boolean> = curryN(2, _equals);
