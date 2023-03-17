import { isPromise, noop, trySafe, tryThat } from './function.js';

const { jest } = import.meta;

describe('noop', () => {
  it('should not explode', () => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    expect(noop()).toBe(undefined);
  });
});

describe('isPromise()', () => {
  it('should return true for Promise or Promise-like', () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    // eslint-disable-next-line unicorn/no-thenable
    expect(isPromise({ then: () => true })).toBe(true);

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const promiseLike = function () {
      return false;
    };
    // eslint-disable-next-line @silverhand/fp/no-mutating-assign, unicorn/no-thenable
    Object.assign(promiseLike, { then: () => true });

    expect(isPromise(promiseLike)).toBe(true);
  });

  it('should return false for non-Promise', () => {
    expect(isPromise({})).toBe(false);
    expect(isPromise(true)).toBe(false);
  });
});

describe('tryThat()', () => {
  it('should directly execute and return or throw if the function is not a Promise', () => {
    expect(tryThat(() => 'foo', new Error('try'))).toStrictEqual('foo');
    expect(() =>
      tryThat(() => {
        throw new Error('Test');
      }, new Error('try'))
    ).toThrowError(new Error('try'));
    expect(() =>
      tryThat(
        () => {
          throw new Error('Test');
        },
        (error) => {
          throw new Error(String(error instanceof Error && error.message) + ' try');
        }
      )
    ).toThrowError(new Error('Test try'));
  });

  it('should execute or unwrap a Promise and throw the error', async () => {
    expect(
      await tryThat(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve('bar');
          }, 0);
        }),
        new Error('try')
      )
    ).toStrictEqual('bar');

    await expect(
      tryThat(
        async () =>
          new Promise((resolve, reject) => {
            reject();
          }),
        () => {
          throw new Error('try');
        }
      )
    ).rejects.toStrictEqual(new Error('try'));
  });
});

describe('trySafe()', () => {
  it('should directly execute and return if the function is not a Promise', () => {
    expect(trySafe(() => 'foo')).toStrictEqual('foo');
    expect(
      trySafe(() => {
        throw new Error('Test');
      })
      // eslint-disable-next-line unicorn/no-useless-undefined
    ).toStrictEqual(undefined);
  });

  it('should execute or unwrap a Promise and catch the error', async () => {
    expect(
      await trySafe(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve('bar');
          }, 0);
        })
      )
    ).toStrictEqual('bar');

    const onError = jest.fn();
    expect(
      await trySafe(
        async () =>
          new Promise((resolve, reject) => {
            reject();
          }),
        onError
      )
      // eslint-disable-next-line unicorn/no-useless-undefined
    ).toStrictEqual(undefined);
    expect(onError).toHaveBeenCalledTimes(1);
  });
});
