import { trySafe } from './function.js';

type ValidKeys<T> = keyof T extends string ? keyof T : never;

export type KeySerial<T extends Record<string, unknown>> =
  | ValidKeys<T>
  | {
      [key in ValidKeys<T>]: T[key] extends unknown[]
        ? never
        : T[key] extends Record<string, unknown>
        ? `${key}.${KeySerial<T[key]>}`
        : never;
    }[ValidKeys<T>];

export type ExtractKeySerialType<
  T extends Record<string, unknown>,
  Serial extends string
> = Serial extends `${infer Key}.${infer Rest}`
  ? T[Key] extends Record<string, unknown>
    ? ExtractKeySerialType<T[Key], Rest>
    : never
  : T[Serial];

/* eslint-disable @silverhand/fp/no-let, @silverhand/fp/no-mutation */
type Get = {
  <T extends Record<string, unknown>, Serial extends KeySerial<T>>(
    object: T,
    keySerial: Serial
  ): ExtractKeySerialType<T, Serial>;
  (object: unknown, keySerial: string): unknown;
};

export const get: Get = (object: unknown, keySerial: string) => {
  if (object === null || typeof object !== 'object') {
    throw new TypeError('Non-object received in `get()`.');
  }

  let result: unknown = object;

  for (const key of keySerial.split('.')) {
    // @ts-expect-error for performance
    result = result[key];
  }

  return result;
};

export const getSafe: Get = (...args: Parameters<Get>) => trySafe(() => get(...args));

/** Same to `get()` but with the strict type definition only to enable IntelliSense. */
export const getValue = <T extends Record<string, unknown>, Serial extends KeySerial<T>>(
  object: T,
  keySerial: Serial
): ExtractKeySerialType<T, Serial> => get(object, keySerial);
/* eslint-enable @silverhand/fp/no-let, @silverhand/fp/no-mutation */
