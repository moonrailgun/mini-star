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
    ['@plugins/common', '@plugins/common'],
  ])('%s => %s', (input, output) => {
    expect(processModulePath('@plugins/demo', input)).toBe(output);
  });

  test('deep path', ()=> {
    expect(processModulePath('@plugins/demo/index-353b8484.js', './index-4a4caf9c.js')).toBe('@plugins/demo/index-4a4caf9c.js')
  })
});
