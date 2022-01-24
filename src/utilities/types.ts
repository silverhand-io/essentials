export type Optional<T> = T | undefined;

export type PlainObject = Record<string | number | symbol, unknown>;

export type ValuesOf<T extends unknown[]> = T[number];

export type Picked<T extends PlainObject, Keys extends Array<keyof T>> = {
  [key in ValuesOf<Keys>]: T[key];
};

export type Falsy = '' | 0 | false | null | undefined;

export type Truthy<T> = Exclude<T, Falsy>;

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
