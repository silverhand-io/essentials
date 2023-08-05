import { condObject, conditionalObject } from './conditional.js';

describe('conditionalObject', () => {
  it('should return a new object with all falsy values removed', () => {
    const result = conditionalObject({ foo: 'foo', bar: undefined, baz: false } as const);
    const result2 = condObject({ foo: 'foo', bar: undefined, baz: false });

    // @ts-expect-error - `baz` is removed from the object.
    type _ = typeof result['baz'];

    // Should be `true | undefined` because `baz` could be true in the original type `boolean`.
    type __ = typeof result2['baz'];

    expect(result).toEqual({ foo: 'foo' });
    expect(result2).toEqual({ foo: 'foo' });
  });

  it('should not remove falsy values nested in objects', () => {
    expect(conditionalObject({ foo: 'foo', bar: { baz: false } })).toEqual({
      foo: 'foo',
      bar: { baz: false },
    });
  });
});
