import { isNode } from './env';

export function toTitle(string: string) {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string');
  }

  return string
    .toLowerCase()
    .replace(/(?:^|\s|-)\S/g, (x) => x.toUpperCase())
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

/**
 * The method `btoa`/`atob` can only encode/decode the characters inside of the Latin1 range.
 * Force Node `buffer` to use Latin1 character set so that its encoded/decoded result is as same as `btoa`/`atob`.
 * It's guaranteed that the behaviors of `UrlSafeBase64.encode` and `UrlSafeBase64.decode` are the same under both Node and browser-like environments.
 * `UrlSafeBase64` below is enough for current use cases, e.g.: for random ascii (within Latin1 range) string generators.
 */
const CHARACTER_SET_OF_BTOA_ATOB = 'latin1';

export const UrlSafeBase64 = {
  isSafe: (input: string) => /^[\w-]*$/.test(input),
  encode: (rawString: string) => {
    const encodedString = isNode()
      ? Buffer.from(rawString, CHARACTER_SET_OF_BTOA_ATOB).toString('base64')
      : btoa(rawString);

    return replaceNonUrlSafeCharacters(encodedString);
  },
  decode: (encodedString: string) => {
    const nonUrlSafeEncodedString = restoreNonUrlSafeCharacters(encodedString);

    return isNode()
      ? Buffer.from(nonUrlSafeEncodedString, 'base64').toString(CHARACTER_SET_OF_BTOA_ATOB)
      : atob(nonUrlSafeEncodedString);
  },
  replaceNonUrlSafeCharacters,
  restoreNonUrlSafeCharacters,
};
