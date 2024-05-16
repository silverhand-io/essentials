export const normalizeValueToStringArray = (value?: string | string[]): string[] => {
  if (value) {
    return Array.isArray(value) ? value : [value];
  }

  return [];
};

// Disable FP rules here to use the performant approach while keep the function itself "FP"
/* eslint-disable @silverhand/fp/no-let, @silverhand/fp/no-mutation */
export const repeat = <T>(times: number, initial: T, iterate: (accumulator: T) => T) => {
  let result = initial;

  while (times--) {
    result = iterate(result);
  }

  return result;
};
/* eslint-enable @silverhand/fp/no-let, @silverhand/fp/no-mutation */

export const deduplicate = <T>(array: T[]) => [...new Set(array)];

/**
 * Deduplicate an array of objects by a specific key.
 *
 * @param array The array of objects to deduplicate.
 * @param key The key to deduplicate by.
 * @example
 * const array = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }, { id: 1, name: 'John' }];
 * deduplicateByKey(array, 'id');
 * // Output: [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }]
 */
export const deduplicateByKey = <T>(array: T[], key: keyof T) => [
  ...new Map(array.map((item) => [item[key], item])).values(),
];
