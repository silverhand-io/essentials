import { notFalsy } from './assertions';
import { Optional, Truthy } from './types';

export const conditional = <T>(exp: T): Optional<Truthy<T>> => (notFalsy(exp) ? exp : undefined);

export const conditionalString = <T>(exp: T): string => (notFalsy(exp) ? String(exp) : '');
