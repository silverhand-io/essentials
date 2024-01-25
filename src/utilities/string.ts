import type { Nullable } from './types.js';

export function toTitle(string: string) {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string');
  }

  return string
    .toLowerCase()
    .replaceAll(/(?:^|\s|-)\S/g, (value) => value.toUpperCase())
    .replaceAll('-', ' ');
}

/**
 * RFC 4648 section 5: base64url (URL- and filename-safe standard)
 * @link https://datatracker.ietf.org/doc/html/rfc4648#section-5
 */
const replaceNonUrlSafeCharacters = (base64String: string) =>
  base64String.replaceAll('+', '-').replaceAll('/', '_').replaceAll(/=+$/g, '');
const restoreNonUrlSafeCharacters = (base64String: string) =>
  base64String.replaceAll('-', '+').replaceAll('_', '/');

export const urlSafeBase64 = {
  isSafe: (input: string) => /^[\w-]*$/.test(input),
  encode: (rawString: string) => {
    const encodedString = btoa(unescape(encodeURIComponent(rawString)));

    return replaceNonUrlSafeCharacters(encodedString);
  },
  decode: (encodedString: string) => {
    const nonUrlSafeEncodedString = restoreNonUrlSafeCharacters(encodedString);

    return decodeURIComponent(escape(atob(nonUrlSafeEncodedString)));
  },
  replaceNonUrlSafeCharacters,
  restoreNonUrlSafeCharacters,
};

export const yes = (value?: Nullable<string>) =>
  // eslint-disable-next-line no-implicit-coercion
  !!value && ['1', 'true', 'y', 'yes', 'yep', 'yeah'].includes(value.toLowerCase());
