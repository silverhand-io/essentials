import { appendPath, joinPath } from './url.js';

describe('joinPath()', () => {
  it('should be able to join path segments correctly', () => {
    expect(joinPath()).toBe('/');
    expect(joinPath('/')).toBe('/');
    expect(joinPath('//')).toBe('/');
    expect(joinPath('//', '/')).toBe('/');
    expect(joinPath('//', '//')).toBe('/');
    expect(joinPath('foo')).toBe('/foo');
    expect(joinPath('foo', '//bar')).toBe('/foo/bar');
    expect(joinPath('foo', '//bar', '///baz///')).toBe('/foo/bar/baz');
    expect(joinPath('foo', '/../bar', '///baz///')).toBe('/bar/baz');
    expect(joinPath('./././foo', './bar', '///baz///')).toBe('/foo/bar/baz');
    expect(joinPath('foo', '/.././...../bar', '/././baz/')).toBe('/bar/baz');
    expect(joinPath('..///..../foo///', '/./././bar', '/././baz/')).toBe('/foo/bar/baz');
    expect(joinPath('..///..../foo///', '/./././..../', '///', '/././baz/')).toBe('/baz');
  });
});

describe('appendPath()', () => {
  it('should be able to append path segments correctly', () => {
    expect(appendPath(new URL('https://foo.bar/foo'))).toStrictEqual(
      new URL('https://foo.bar/foo')
    );

    expect(appendPath(new URL('https://foo.bar/foo//'), '//bar', 'baz')).toStrictEqual(
      new URL('https://foo.bar/foo/bar/baz')
    );

    expect(appendPath(new URL('https://foo.bar////'))).toStrictEqual(new URL('https://foo.bar/'));

    expect(
      appendPath(new URL('https://foo.bar///'), '/a/b/c/././', '../../d', '///e')
    ).toStrictEqual(new URL('https://foo.bar/a/d/e'));
  });
});
