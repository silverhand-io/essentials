import { toTitle, UrlSafeBase64 } from './string';

describe('toTitle()', () => {
  test('upper-case the first non-blank character of each word', () => {
    expect(toTitle('normal title')).toEqual('Normal Title');
  });

  test('remove `-` characters in the string', () => {
    expect(toTitle('String-Contains-Minus-Signs')).toEqual('String Contains Minus Signs');
  });
});

describe('UrlSafeBase64()', () => {
  const RAW_CONTENT = 'J)oz¸Z\u009Dß¢£ùh\u0082Ú';
  const URL_SAFE_ENCODED_CONTENT = 'Silverhand-io_logto';

  describe('encode()', () => {
    test('replace plus sign `+` (by minus sign `-`) and slash `/` (by underscore `_`) in base64-encoded content', () => {
      expect(UrlSafeBase64.encode(RAW_CONTENT)).toEqual(URL_SAFE_ENCODED_CONTENT);
    });
  });

  describe('decode()', () => {
    test('restore plus sign `+` (by minus sign `-`) and slash `/` (by underscore `_`) in base64-encoded content', () => {
      expect(UrlSafeBase64.decode(URL_SAFE_ENCODED_CONTENT)).toEqual(RAW_CONTENT);
    });
  });

  const ENCODED_CONTENT = 'Silverhand+io/logto';

  describe('replaceNonUrlSafeCharacters()', () => {
    test('replaceNonUrlSafeCharacters and remove non-url-safe character `=`', () => {
      expect(UrlSafeBase64.replaceNonUrlSafeCharacters(`${ENCODED_CONTENT}=`)).toEqual(
        URL_SAFE_ENCODED_CONTENT
      );
    });
  });

  describe('restoreNonUrlSafeCharacters()', () => {
    test('restoreNonUrlSafeCharacters', () => {
      expect(UrlSafeBase64.restoreNonUrlSafeCharacters(URL_SAFE_ENCODED_CONTENT)).toEqual(
        ENCODED_CONTENT
      );
    });
  });

  describe('isSafe()', () => {
    test('empty string should be true', () => {
      expect(UrlSafeBase64.isSafe('')).toBeTruthy();
    });

    test('url-safe characters should be true', () => {
      expect(
        UrlSafeBase64.isSafe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_')
      ).toBeTruthy();
    });

    test('non-url-safe characters should be false', () => {
      expect(UrlSafeBase64.isSafe('=+')).toBeFalsy();
    });
  });
});
