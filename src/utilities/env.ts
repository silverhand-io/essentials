import { assert } from './assert';

export const getEnv = (key: string, fallback = ''): string => process.env[key] ?? fallback;

export const assertEnv = (key: string): string => {
  const value = process.env[key];
  assert(value, new Error(`env variable ${key} not found`));

  return value;
};

export const isNode = () => typeof window === 'undefined';
