// Intended
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const isPromise = (value: unknown): value is Promise<unknown> =>
  value !== null &&
  (typeof value === 'object' || typeof value === 'function') &&
  'then' in value &&
  typeof value.then === 'function';

export type TrySafe = {
  <T>(exec: Promise<T> | (() => Promise<T>), onError?: (error: unknown) => void): Promise<
    T | undefined
  >;
  <T>(exec: () => T, onError?: (error: unknown) => void): T | undefined;
};

export const trySafe: TrySafe = (exec, onError) => {
  try {
    const unwrapped = typeof exec === 'function' ? exec() : exec;

    return isPromise(unwrapped)
      ? // eslint-disable-next-line promise/prefer-await-to-then
        unwrapped.catch((error: unknown) => {
          onError?.(error);
        })
      : unwrapped;
  } catch (error: unknown) {
    onError?.(error);
  }
};
