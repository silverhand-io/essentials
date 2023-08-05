// eslint-disable-next-line @typescript-eslint/ban-types
export const isObject = (object: unknown): object is object =>
  object !== null && typeof object === 'object';

export const isKeyInObject = <Key extends string>(
  object: unknown,
  key: Key
  // eslint-disable-next-line @typescript-eslint/ban-types
): object is object & Record<Key, unknown> => isObject(object) && key in object;

/**
 * Remove all keys with `undefined` values from an object. This function only
 * performs a shallow removal, i.e. it does not remove `undefined` values nested
 * in objects.
 *
 * @param object The object to remove `undefined` keys from.
 * @returns A new object with all `undefined` keys removed.
 */
export const removeUndefinedKeys = <T extends Record<string, unknown>>(object: T): T =>
  // eslint-disable-next-line no-restricted-syntax
  Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined)) as T;
