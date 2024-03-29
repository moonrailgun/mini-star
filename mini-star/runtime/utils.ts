function trimDotOfPath(parent: string, self: string) {
  if (!self.startsWith('.')) {
    return self;
  }
  const parentList = parent.split('/');
  const selfList = self.split('/');
  parentList.pop();
  const selfRet: string[] = [];
  selfList.forEach((item) => {
    if (item === '..') {
      parentList.pop();
    }
    if (item !== '..' && item !== '.') {
      selfRet.push(item);
    }
  });
  return parentList.concat(selfRet).join('/');
}

/**
 * A function how to process module path to real path
 */
export function processModulePath(
  baseModuleName: string,
  path: string
): string {
  if (isPluginModuleName(path)) {
    return path;
  }

  if (path.endsWith('.js') || path.startsWith('./')) {
    return trimDotOfPath(
      !baseModuleName.endsWith('.js') ? baseModuleName + '/' : baseModuleName,
      !path.endsWith('.js') ? `${path}.js` : path
    );
  }

  return path;
}

/**
 * @example
 * @plugins/any => true
 */
export function isPluginModuleName(fullName: string): boolean {
  if (typeof fullName !== 'string') {
    return false;
  }

  return fullName.startsWith('@plugins/');
}

/**
 * @example
 * @plugins/any => true
 * @plugins/any/other.js => false
 */
export function isPluginModuleEntry(fullName: string): boolean {
  if (typeof fullName !== 'string') {
    return false;
  }

  return fullName.startsWith('@plugins/') && fullName.split('/').length === 2;
}

/**
 * @example
 * @plugins/any => false
 * @plugins/any/other.js => true
 * @plugins/any/dir/another.js => true
 */
export function isPluginSubModule(fullName: string): boolean {
  if (typeof fullName !== 'string') {
    return false;
  }

  return fullName.startsWith('@plugins/') && fullName.split('/').length > 2;
}

/**
 * @example
 * @plugins/any => any
 */
export function getPluginName(fullName: string): string | null {
  if (!isPluginModuleName(fullName)) {
    return null;
  }

  const [, name] = fullName.split('/');
  return name;
}

/**
 * Check is full url
 */
export function isFullUrl(url: string): boolean {
  return url.startsWith('http:') || url.startsWith('https:');
}

/**
 * @example
 * ('http://127.0.0.1:8080/plugins/core/index.js', '/plugins/core/foo.js') => 'http://127.0.0.1:8080/plugins/core/foo.js'
 * ('http://127.0.0.1:8080/public/plugins/core/index.js', '/plugins/core/foo.js') => 'http://127.0.0.1:8080/public/plugins/core/foo.js'
 * ('http://127.0.0.1:8080/public/core/index.js', '/plugins/core/foo.js') => 'http://127.0.0.1:8080/public/core/foo.js'
 * ('http://127.0.0.1:8080/public/index.js', '/plugins/core/foo.js') => '/plugins/core/foo.js'
 */
export function mergeUrl(baseUrl: string, appendUrl: string) {
  const [, prefix, pluginName, ...rest] = appendUrl.split('/');
  const matchStr = `/${pluginName}`;

  const index = baseUrl.search(matchStr);
  if (index === -1) {
    return appendUrl;
  }

  return baseUrl.slice(0, index) + matchStr + '/' + rest.join('/');
}
