import { once } from './once.js';

const { jest } = import.meta;

describe('once()', () => {
  test('should call the function only once', () => {
    const function_ = jest.fn();
    const onceFunction = once(function_);

    onceFunction();
    onceFunction();
    onceFunction();

    expect(function_).toBeCalledTimes(1);
  });
});
