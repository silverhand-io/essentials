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
export const conditionalObject = <T extends Record<string, unknown>>(
  object: T
): Record<keyof T, Truthy<T[keyof T]>> =>
  // eslint-disable-next-line no-restricted-syntax
  Object.fromEntries(Object.entries(object).filter(([, value]) => notFalsy(value))) as Record<
    keyof T,
    Truthy<T[keyof T]>
  >;

/** Alias for {@link conditionalObject}. */
export const condObject = conditionalObject;
