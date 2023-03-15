import { notFalsy } from './assertions.js';
import type { Falsy, Nullable, Optional, Truthy } from './types.js';

export const nullable = <T>(exp: T): Nullable<Truthy<T>> => (notFalsy(exp) ? exp : null);

export const conditional = <T>(exp: T): Optional<Truthy<T>> => (notFalsy(exp) ? exp : undefined);

export const conditionalString = <T>(exp: T): string => (notFalsy(exp) ? String(exp) : '');

export const conditionalArray = <T>(
  ...exp: Readonly<Array<T | Falsy>>
): Array<T extends Readonly<Array<infer InnerArray>> ? InnerArray : T> =>
  exp.filter((value): value is Exclude<typeof value, Falsy> => notFalsy(value)).flat();
