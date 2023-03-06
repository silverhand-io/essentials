/** Join multiple path segments. This function exists since there's no native implementation in browser. */
export const joinPath = (...segments: string[]) => {
  const result: string[] = [];

  for (const segment of segments.join('/').split('/')) {
    if (!segment || segment === '.') {
      continue;
    }

    if ([...segment].every((char) => char === '.')) {
      // eslint-disable-next-line @silverhand/fp/no-mutating-methods
      result.pop();
      continue;
    }

    // eslint-disable-next-line @silverhand/fp/no-mutating-methods
    result.push(segment);
  }

  return '/' + result.join('/');
};

/** Append path segments to the base URL. */
export const appendPath = (baseUrl: URL, ...pathnames: string[]) =>
  new URL(joinPath(baseUrl.pathname, ...pathnames), baseUrl);
