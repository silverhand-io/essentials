import { removeUndefinedKeys } from './object.js';

describe('removeUndefinedKeys', () => {
  it('removes undefined keys from an object', () => {
    const object = {
      foo: 'foo',
      bar: undefined,
      baz: 'baz',
    };

    expect(removeUndefinedKeys(object)).toEqual({
      foo: 'foo',
      baz: 'baz',
    });
  });

  it('does not mutate the original object', () => {
    const object = {
      foo: 'foo',
      bar: undefined,
      baz: 'baz',
    };

    removeUndefinedKeys(object);

    expect(object).toEqual({
      foo: 'foo',
      bar: undefined,
      baz: 'baz',
    });
  });

  it('does not remove keys with falsy value that is not undefined', () => {
    const object = {
      foo: 'foo',
      bar: null,
      baz: false,
    };

    expect(removeUndefinedKeys(object)).toEqual({
      foo: 'foo',
      bar: null,
      baz: false,
    });
  });

  it('does not remove nested undefined keys', () => {
    const object = {
      foo: 'foo',
      bar: {
        baz: undefined,
      },
    };

    expect(removeUndefinedKeys(object)).toEqual({
      foo: 'foo',
      bar: {
        baz: undefined,
      },
    });
  });
});
