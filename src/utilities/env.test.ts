import { assertEnv, getEnv, getEnvAsStringArray, isNode } from './env.js';

describe('getEnv()', () => {
  beforeAll(() => {
    process.env = { FOO: 'bar' };
  });

  it('returns correct env value', () => {
    expect(getEnv('FOO')).toEqual('bar');
  });

  it("returns fallback if env doesn't exist", () => {
    expect(getEnv('BAR', '123')).toEqual('123');
  });
});

describe('getEnvAsStringArray()', () => {
  const envBackup = process.env;

  beforeEach(() => {
    process.env = { ...envBackup };
  });

  it('returns correct env value', () => {
    process.env = { FOO: 'bar,baz' };
    expect(getEnvAsStringArray('FOO')).toEqual(['bar', 'baz']);

    process.env.NEED_TO_TRIM_VALUE = '  bar,baz  ';
    expect(getEnvAsStringArray('NEED_TO_TRIM_VALUE')).toEqual(['bar', 'baz']);
  });

  it("returns fallback if env doesn't exist", () => {
    process.env = { BAR: '' };
    expect(getEnvAsStringArray('BAR', ['123'])).toEqual(['123']);
  });

  it('returns empty array if env is empty', () => {
    process.env = { BAR: '' };
    expect(getEnvAsStringArray('BAR')).toEqual([]);
  });

  it('returns env value as array if only one value is provided', () => {
    process.env.SINGLE = 'single';
    expect(getEnvAsStringArray('SINGLE')).toEqual(['single']);
  });
});

describe('assertEnv()', () => {
  beforeAll(() => {
    process.env = { FOO: 'bar' };
  });

  it('returns correct env value', () => {
    expect(assertEnv('FOO')).toEqual('bar');
  });

  it("throws an error if env doesn't exist", () => {
    expect(() => assertEnv('BAR')).toThrow('env variable BAR not found');
  });
});

describe('isNode()', () => {
  it('when running under Node', () => {
    expect(isNode()).toBeTruthy();
  });
});
