import {
  createNewModuleLoader,
  isFullUrl,
  mergeUrl,
  processModulePath,
} from '../utils';

test('createNewModuleLoader', () => {
  expect(createNewModuleLoader()).toMatchSnapshot();
});

describe('processModulePath', () => {
  test.each([
    ['require', 'require'],
    ['exports', 'exports'],
    ['model', 'model'],
    ['model.js', 'model.js'],
    ['./model', '@plugins/demo/model.js'],
    ['./model.js', '@plugins/demo/model.js'],
    ['@plugins/common', '@plugins/common'],
  ])('%s => %s', (input, output) => {
    expect(processModulePath('@plugins/demo', input)).toBe(output);
  });

  test('deep path', () => {
    expect(
      processModulePath(
        '@plugins/demo/index-353b8484.js',
        './index-4a4caf9c.js'
      )
    ).toBe('@plugins/demo/index-4a4caf9c.js');
  });
});

describe('isFullUrl', () => {
  test.each([
    ['/plugin/foo/js', false],
    ['http://127.0.0.1:8080/plugins/core/index.js', true],
    ['https://127.0.0.1:8080/plugins/core/index.js', true],
  ])('%s => %s', (input, output) => {
    expect(isFullUrl(input)).toBe(output);
  });
});

describe('mergeUrl', () => {
  test.each([
    [
      'http://127.0.0.1:8080/plugins/core/index.js',
      '/plugins/core/foo.js',
      'http://127.0.0.1:8080/plugins/core/foo.js',
    ],
    [
      'http://127.0.0.1:8080/public/plugins/core/index.js',
      '/plugins/core/foo.js',
      'http://127.0.0.1:8080/public/plugins/core/foo.js',
    ],
    [
      'http://127.0.0.1:8080/public/index.js',
      '/plugins/core/foo.js',
      '/plugins/core/foo.js',
    ],
  ])('%s + %s => %s', (input1, input2, output) => {
    expect(mergeUrl(input1, input2)).toBe(output);
  });
});
