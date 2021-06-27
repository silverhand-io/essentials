export type Optional<T> = T | undefined;

export type PlainObject = Record<string | number | symbol, unknown>;

export type ValuesOf<T extends unknown[]> = T[number];

export type Picked<T extends PlainObject, Keys extends Array<keyof T>> = {
  [key in ValuesOf<Keys>]: T[key];
};

export type Falsy = '' | 0 | false | null | undefined;

export type Truthy<T> = Exclude<T, Falsy>;
