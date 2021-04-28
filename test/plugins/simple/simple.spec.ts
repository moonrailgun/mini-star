import { readFiles, setupBuildTest } from '../../utils';
import path from 'path';

const output = path.join(__dirname, 'dist');

describe('plugin: simple', () => {
  let files: Record<string, string> = {};

  beforeAll(() => {
    setupBuildTest(__dirname);

    files = readFiles(output);
  });

  it('Should build simple plugin', () => {
    expect(Object.keys(files)).toEqual([
      '/plugins/demo/index.js',
      '/plugins/demo/index.js.map',
    ]);
    expect(files['/plugins/demo/index.js']).toMatchSnapshot();
  });
});
