import orderBy from 'lodash.orderby';
import pick from 'lodash.pick';

import { Optional, Picked, PlainObject, Truthy } from './types';

export const isSameArray = <T extends string | boolean | number>(a: T[], b: T[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  const sortedA = orderBy(a);
  const sortedB = orderBy(b);

  return sortedA.every((value, index) => value === sortedB[index]);
};

export const pickState =
  <T extends PlainObject, Keys extends Array<keyof T>>(...keys: Keys) =>
  (state: T): Picked<T, Keys> =>
    pick(state, ...keys);

export const notFalsy = <T>(value: T): value is Truthy<T> => Boolean(value);

export const conditional = <T>(exp: T): Optional<Truthy<T>> => (notFalsy(exp) ? exp : undefined);

export const conditionalString = <T>(exp: T): string => (notFalsy(exp) ? String(exp) : '');

export const notEmpty = <T>(x: T): x is NonNullable<T> => x !== null && x !== undefined;

export const has = (data: unknown, property: string) =>
  Object.prototype.hasOwnProperty.call(data, property);

export const hasChineseCharacter = (string: string): boolean =>
  Boolean(/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(string));
