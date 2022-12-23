import type { Picked, PlainObject } from './types.js';

export const pick = <T, Keys extends Array<keyof T>>(
  object: T,
  ...keys: Keys
): { [key in Keys[number]]: T[key] } => {
  // eslint-disable-next-line no-restricted-syntax
  return Object.fromEntries(keys.map((key) => [key, object[key]])) as {
    [key in Keys[number]]: T[key];
  };
};

export const pickState =
  <T extends PlainObject, Keys extends Array<keyof T>>(...keys: Keys) =>
  (state: T): Picked<T, Keys> =>
    pick(state, ...keys);
