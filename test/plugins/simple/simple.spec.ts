import { loadHTMLFile, readFiles, setupBuildTest, sleep } from '../../utils';
import path from 'path';

const output = path.join(__dirname, 'dist');

let files: Record<string, string> = {};

beforeAll(() => {
  setupBuildTest(__dirname);

  files = readFiles(output);
});

describe('plugin', () => {
  it('Should build simple plugin', () => {
    expect(Object.keys(files)).toEqual([
      '/bundle.js',
      '/bundle.js.map',
      '/index.html',
      '/plugins/demo/index.js',
      '/plugins/demo/index.js.map',
    ]);
    expect(files['/plugins/demo/index.js']).toMatchSnapshot();
  });
});

describe('runtime', () => {
  it('html', async () => {
    const { dom, logFn } = await loadHTMLFile(
      path.resolve(__dirname, './dist/index.html')
    );

    expect(dom.window.document.body.innerHTML).toMatchSnapshot();

    await sleep(500);

    expect(dom.window.document.body.innerHTML).toMatchSnapshot();

    expect(logFn.mock.calls.length).toBeGreaterThanOrEqual(2);
    expect(logFn.mock.calls).toEqual([['Hello World'], ['Hello Demo!']]);
  });
});
