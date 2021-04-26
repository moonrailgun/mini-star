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
    ['./model', '@plugins/demo/model.js'],
    ['./model.js', '@plugins/demo/model.js'],
    ['@plugins/common', '@plugins/common/index.js'],
  ])('%s', (input, output) => {
    expect(processModulePath('@plugins/demo', input)).toBe(output);
  });
});
