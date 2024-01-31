import { isPlainObject, isSameArray } from './assertions.js';

describe('isSameArray()', () => {
  it('should return true for same arrays', () => {
    expect(isSameArray(['a', 'b', 'cc'], ['b', 'cc', 'a'])).toBeTruthy();
    expect(isSameArray([123, 456, 789], [789, 456, 123])).toBeTruthy();
    expect(isSameArray([true, true, false], [false, true, true])).toBeTruthy();
  });

  it('should return true for different arrays', () => {
    expect(isSameArray(['a', 'b', 'cc'], ['b', 'c', 'a'])).toBeFalsy();
    expect(isSameArray([123, 456, 789], [789, 45, 123])).toBeFalsy();
    expect(isSameArray([true, true, false], [true, true, true])).toBeFalsy();
  });

  it('should throw when array types are not same', () => {
    // @ts-expect-error for testing
    expect(() => isSameArray(['a', 'b', 'cc'], ['b', 'c', 1])).toThrowError(
      'Unsupported compare type'
    );
  });
});

describe('isPlainObject()', () => {
  class Foo {
    abc = {};
  }

  // Should return true with isPlainObject()
  const trues = [
    Object.create({}),
    Object.create(Object.prototype),
    { foo: 'bar' },
    {},
    Object.create(null),
  ];

  // Should return false with isPlainObject()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const falses = [/foo/, function () {}, 1, ['foo', 'bar'], [], new Foo(), null];

  it('should return true', () => {
    for (const trueValue of trues) {
      expect(isPlainObject(trueValue)).toBeTruthy();
    }
  });

  it('should return false', () => {
    for (const falseValue of falses) {
      expect(isPlainObject(falseValue)).toBeFalsy();
    }
  });
});
