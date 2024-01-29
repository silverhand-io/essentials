// eslint-disable-next-line @typescript-eslint/ban-types
export const isObject = (object: unknown): object is object =>
  object !== null && typeof object === 'object';

export const isKeyInObject = <Key extends string>(
  object: unknown,
  key: Key
  // eslint-disable-next-line @typescript-eslint/ban-types
): object is object & Record<Key, unknown> => isObject(object) && key in object;

/**
 * A utility type that removes all keys with `undefined` values from an object.
 *
 * Note: Optional keys with `undefined` values are not removed.
 *
 * @example
 * ```ts
 * type Foo = { a: string; b: number | undefined; c?: boolean };
 * type Bar = RemoveUndefinedKeys<Foo>;
 * // Bar is { a: string; b: number; c?: boolean }
 * ```
 */
type RemoveUndefinedKeys<T> = {
  [Key in keyof T as T[Key] extends undefined ? never : Key]: Exclude<T[Key], undefined>;
};

/**
 * Remove all keys with `undefined` values from an object. This function only
 * performs a shallow removal, i.e. it does not remove `undefined` values nested
 * in objects.
 *
 * @param object The object to remove `undefined` keys from.
 * @returns A new object with all `undefined` keys removed.
 */
// eslint-disable-next-line @typescript-eslint/ban-types -- this is a utility function
export const removeUndefinedKeys = <T extends object>(object: T): RemoveUndefinedKeys<T> =>
  // eslint-disable-next-line no-restricted-syntax
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined)
  ) as RemoveUndefinedKeys<T>;
