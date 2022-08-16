// eslint-disable-next-line @typescript-eslint/ban-types
export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type PlainObject = Record<string | number | symbol, unknown>;

export type ValuesOf<T extends unknown[]> = T[number];

export type Picked<T extends PlainObject, Keys extends Array<keyof T>> = {
  [key in ValuesOf<Keys>]: T[key];
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type Falsy = '' | 0 | false | null | undefined;

export type Truthy<T> = Exclude<T, Falsy>;

// Copied from react-i18next, disable to honor the original code
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * MIT License
 *
 * Copyright (c) 2021 i18next
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/* Reference to `Normalize` in react-i18next/ts4.1/index.d.ts */
/**
 * Join keys: e.g. type K1 = 'a', type K2 = 'b', JoinKeys<K1, K2> = 'a.b'
 */
type JoinKeys<K1, K2> = `${K1 & string}.${K2 & string}`;

/**
 * Join keys excluding array key: e.g. type K1 = 'a', type K2 = keyof any[], JoinKeys<K1, K2> = never
 */
type JoinKeysExcludingArrayKey<K1, K2> = JoinKeys<K1, Exclude<K2, keyof any[]>>;

/**
 * Normalize read-only key paths recursively
 */
type NormalizeKeyPathsRecursively<T, K = keyof T> = K extends keyof T
  ? T[K] extends Record<string, any>
    ? T[K] extends readonly any[]
      ?
          | JoinKeysExcludingArrayKey<K, keyof T[K]>
          | JoinKeysExcludingArrayKey<K, NormalizeKeyPathsRecursively<T[K]>>
      : JoinKeys<K, keyof T[K]> | JoinKeys<K, NormalizeKeyPathsRecursively<T[K]>>
    : never
  : never;
/**
 * Normalize read-only key paths
 */
export type NormalizeKeyPaths<T> = keyof T | NormalizeKeyPathsRecursively<T>;

/**
 * Compose a new type from another type by mapping snake case type keys to camel case
 * E.g. type T = { key_of_string: string } => type U = { keyOfString: string }
 *
 * Inspired by:
 * https://stackoverflow.com/a/65015868/3431443
 */
type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>;

export type KeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends Record<string, unknown>
    ? KeysToCamelCase<T[K]>
    : T[K];
};
/* eslint-enable @typescript-eslint/no-explicit-any */
