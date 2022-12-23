import { expectTypeOf } from 'expect-type';

import type { KeysToCamelCase } from './types.js';

describe('Check type conversion', () => {
  test('Snake case to camel case key mapping conversion', () => {
    type SnakeCaseKeyType = {
      key_of_string: string;
      key_of_number: number;
    };

    type CamelCaseKeyType = {
      keyOfString: string;
      keyOfNumber: number;
    };

    expectTypeOf<SnakeCaseKeyType>().not.toEqualTypeOf<CamelCaseKeyType>();
    expectTypeOf<KeysToCamelCase<SnakeCaseKeyType>>().toEqualTypeOf<CamelCaseKeyType>();
  });
});
