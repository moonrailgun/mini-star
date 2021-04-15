import { createNewModuleLoader, processModulePath } from '../utils';

test('createNewModuleLoader', () => {
  expect(createNewModuleLoader()).toMatchSnapshot();
});

describe('processModulePath', () => {
  test.each([
    ['require', 'require'],
    ['exports', 'exports'],
    ['model', 'model'],
    ['model.js', 'model.js'],
    ['./model', 'demo/model.js'],
    ['./model.js', 'demo/model.js'],
    ['@plugin/common', 'common/index.js'],
  ])('%s', (input, output) => {
    expect(processModulePath('demo/index.js', input)).toBe(output);
  });
});
