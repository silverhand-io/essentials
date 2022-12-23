/** @jest-environment jsdom */
import { isNode } from './env.js';

describe('isNode()', () => {
  it('when running under non-Node', () => {
    expect(isNode()).toBeFalsy();
  });
});
