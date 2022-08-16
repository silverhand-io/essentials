import orderBy from 'lodash.orderby';

import { Truthy } from './types';

export const isSameArray = <T extends string | boolean | number>(
  array1: T[],
  array2: T[]
): boolean => {
  if (array1.length !== array2.length) {
    return false;
  }

  const sortedA = orderBy(array1);
  const sortedB = orderBy(array2);

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
