import { isNode } from './env.js';
import type { Nullable } from './types.js';

export function toTitle(string: string) {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string');
  }

  return string
    .toLowerCase()
    .replace(/(?:^|\s|-)\S/g, (value) => value.toUpperCase())
    .replace(/-/g, ' ');
}

/**
 * RFC 4648 section 5: base64url (URL- and filename-safe standard)
 * @link https://datatracker.ietf.org/doc/html/rfc4648#section-5
 */
const replaceNonUrlSafeCharacters = (base64String: string) =>
  base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
const restoreNonUrlSafeCharacters = (base64String: string) =>
  base64String.replace(/-/g, '+').replace(/_/g, '/');

export const urlSafeBase64 = {
  isSafe: (input: string) => /^[\w-]*$/.test(input),
  encode: (rawString: string) => {
    const encodedString = isNode()
      ? Buffer.from(rawString, 'utf8').toString('base64')
      : window.btoa(unescape(encodeURIComponent(rawString)));

    return replaceNonUrlSafeCharacters(encodedString);
  },
  decode: (encodedString: string) => {
    const nonUrlSafeEncodedString = restoreNonUrlSafeCharacters(encodedString);

    return isNode()
      ? Buffer.from(nonUrlSafeEncodedString, 'base64').toString('utf8')
      : decodeURIComponent(escape(window.atob(nonUrlSafeEncodedString)));
  },
  replaceNonUrlSafeCharacters,
  restoreNonUrlSafeCharacters,
};

export const yes = (value?: Nullable<string>) =>
  // eslint-disable-next-line no-implicit-coercion
  !!value && ['1', 'true', 'y', 'yes', 'yep', 'yeah'].includes(value.toLowerCase());
