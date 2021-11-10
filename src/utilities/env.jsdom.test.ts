/** @jest-environment jsdom */
import { isNode } from './env';

describe('isNode()', () => {
  it('when running under non-Node', () => {
    expect(isNode()).toBeFalsy();
  });
});
