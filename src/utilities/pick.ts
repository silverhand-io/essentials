import pick from 'lodash.pick';

import { Picked, PlainObject } from './types';

export { default as pick } from 'lodash.pick';

export const pickState =
  <T extends PlainObject, Keys extends Array<keyof T>>(...keys: Keys) =>
  (state: T): Picked<T, Keys> =>
    pick(state, ...keys);
