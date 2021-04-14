import { createNewModuleLoader } from '../utils';

test('createNewModuleLoader', () => {
  expect(createNewModuleLoader()).toMatchSnapshot();
});
