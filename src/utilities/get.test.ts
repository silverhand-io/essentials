import { get, getSafe, getValue } from './get.js';

describe('get()', () => {
  const object = { aaa: 'asdasd', bbb: { ccc: 123, ddd: { eee: [true] } } };

  it('should return proper value with even nested keys', () => {
    expect(get(object, 'aaa')).toStrictEqual('asdasd');
    expect(get(object, 'bbb')).toStrictEqual({ ccc: 123, ddd: { eee: [true] } });
    expect(get(object, 'bbb.ccc')).toStrictEqual(123);
    expect(getValue(object, 'bbb.ddd')).toStrictEqual({ eee: [true] });
    expect(getValue(object, 'bbb.ddd.eee')).toStrictEqual([true]);
  });

  it('should return undefined of throw TypeError when accessing non-existing value', () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(get(object, 'ddd')).toStrictEqual(undefined);
    expect(() => get(object, 'ddd.ccc')).toThrowError(TypeError);
    expect(() => get('', '')).toThrowError(new TypeError('Non-object received in `get()`.'));
  });

  it('should return undefined when error or same value as `get()` with `getSafe()`', () => {
    expect(getSafe(object, 'bbb.ccc')).toStrictEqual(123);
    /* eslint-disable unicorn/no-useless-undefined */
    expect(getSafe(object, 'ddd')).toStrictEqual(undefined);
    expect(getSafe(object, 'ddd.ccc')).toStrictEqual(undefined);
    expect(getSafe('', '')).toStrictEqual(undefined);
    /* eslint-enable unicorn/no-useless-undefined */
  });
});
