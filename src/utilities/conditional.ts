import { notFalsy } from './assertions.js';
import type { Falsy, Nullable, Optional, Truthy } from './types.js';

export const nullable = <T>(exp: T): Nullable<Truthy<T>> => (notFalsy(exp) ? exp : null);

/**
 * Conditional return the expression result when it's not {@link Falsy};
 * otherwise return `undefined`.
 *
 * @example
 * ```ts
 * conditional(1 && '2') // '2'
 * conditional(false && '1') // undefined
 * ```
 */
export const conditional = <T>(exp: T): Optional<Truthy<T>> => (notFalsy(exp) ? exp : undefined);

/** Alias for {@link conditional}. */
export const cond = conditional;

/**
 * Conditional return the stringified expression result (using `String`) when it's not {@link Falsy};
 * otherwise return an empty string.
 *
 * @example
 * ```ts
 * conditionalString(1 && 2) // '2'
 * conditionalString(false && '1') // ''
 * ```
 */
export const conditionalString = <T>(exp: T): string => (notFalsy(exp) ? String(exp) : '');

/** Alias for {@link conditionalString}. */
export const condString = conditionalString;

/**
 * Conditional concat multiple expression results into a array by filtering all {@link Falsy} results
 * and flatten 1 level deep if the expression result is an array.
 *
 * @example
 * ```ts
 * conditionalArray(1, [2, 3]) // [1, 2, 3]
 * ```
 */
export const conditionalArray = <T>(
  ...exps: Readonly<Array<T | Falsy>>
): Array<T extends Readonly<Array<infer InnerArray>> ? InnerArray : T> =>
  exps.filter((value): value is Exclude<typeof value, Falsy> => notFalsy(value)).flat();

/** Alias for {@link conditionalArray}. */
export const condArray = conditionalArray;

/**
 * An object with all {@link Falsy} values removed while keeping the object structure.
 * Note `undefined` definitions are not removed from the object in some conditions
 * because it's uncertain whether the value is falsy or not.
 */
export type TruthyObject<T extends Record<string, unknown>> = {
  // Directly remove the key if the type is falsy.
  [K in keyof T as T[K] extends Falsy ? never : K]: [T[K] & Falsy] extends [never]
    ? // No intersection with falsy types, keep the type.
      T[K]
    : // If the type could be falsy, make it optional.
      Optional<Truthy<T[K]>>;
};

/**
 * Return a new object with all {@link Falsy} values removed.
 * This function only performs a shallow removal, i.e. it does not remove
 * {@link Falsy} values nested in objects.
 *
 * @example
 * ```ts
 * conditionalObject({
 *   foo: 'foo',
 *   bar: undefined,
 *   baz: false,
 * }) // { foo: 'foo' }
 * ```
 */
export const conditionalObject = <T extends Record<string, unknown>>(object: T): TruthyObject<T> =>
  // eslint-disable-next-line no-restricted-syntax
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => notFalsy(value))
  ) as TruthyObject<T>;

/** Alias for {@link conditionalObject}. */
export const condObject = conditionalObject;
