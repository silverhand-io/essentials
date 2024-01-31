import type { Truthy } from './types.js';

// eslint-disable-next-line id-length
const compareFunction = <T extends string | boolean | number>(a: T, b: T) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return Number(a) - Number(b);
  }

  throw new Error('Unsupported compare type');
};

export const isSameArray = <T extends string | boolean | number>(
  array1: T[],
  array2: T[]
): boolean => {
  if (array1.length !== array2.length) {
    return false;
  }

  const sortedA = array1.slice().sort(compareFunction);
  const sortedB = array2.slice().sort(compareFunction);

  return sortedA.every((value, index) => value === sortedB[index]);
};

// eslint-disable-next-line unicorn/prefer-native-coercion-functions
export const notFalsy = <T>(value: T): value is Truthy<T> => Boolean(value);

export const notEmpty = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;

export const has = (data: unknown, property: string) =>
  Object.prototype.hasOwnProperty.call(data, property);

export const hasChineseCharacter = (string: string): boolean =>
  Boolean(/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(string));

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

// eslint-disable-next-line @typescript-eslint/ban-types -- this is a utility function
const isObject = (object: unknown): object is object =>
  Object.prototype.toString.call(object) === '[object Object]';

/** Returns true if an object was created by the `Object` constructor, or `Object.create(null)`. */
export function isPlainObject(object: unknown) {
  if (!isObject(object)) {
    return false;
  }

  // If has modified constructor
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (object.constructor === undefined) {
    return true;
  }

  // If has modified prototype
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, prefer-destructuring
  const prototype = object.constructor.prototype;

  if (!isObject(prototype)) {
    return false;
  }

  // If constructor does not have an Object-specific method
  if (!has(prototype, 'isPrototypeOf')) {
    return false;
  }

  // Most likely a plain Object
  return true;
}
