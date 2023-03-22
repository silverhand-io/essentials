// eslint-disable-next-line @typescript-eslint/ban-types
export const isObject = (object: unknown): object is object =>
  object !== null && typeof object === 'object';

export const isKeyInObject = <Key extends string>(
  object: unknown,
  key: Key
  // eslint-disable-next-line @typescript-eslint/ban-types
): object is object & Record<Key, unknown> => isObject(object) && key in object;
