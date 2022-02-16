import { notFalsy } from './assertions';
import { Nullable, Optional, Truthy } from './types';

export const nullable = <T>(exp: T): Nullable<Truthy<T>> => (notFalsy(exp) ? exp : null);

export const conditional = <T>(exp: T): Optional<Truthy<T>> => (notFalsy(exp) ? exp : undefined);

export const conditionalString = <T>(exp: T): string => (notFalsy(exp) ? String(exp) : '');
