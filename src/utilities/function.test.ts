import { trySafe } from './function.js';

const { jest } = import.meta;

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
