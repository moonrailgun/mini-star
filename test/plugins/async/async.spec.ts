import { readFiles, setupBuildTest } from '../../utils';
import path from 'path';

const output = path.join(__dirname, 'dist');

describe('plugin: simple', () => {
  let files: Record<string, string> = {};

  beforeAll(() => {
    setupBuildTest(__dirname);

    files = readFiles(output);
  });

  it('Should build async plugin', () => {
    for (const fileName in files) {
      expect(files[fileName]).toMatchSnapshot(fileName);
    }
  });
});
