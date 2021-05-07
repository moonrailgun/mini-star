import { loadHTMLFile, setupBuildTest, sleep } from '../../utils';
import path from 'path';

beforeAll(() => {
  setupBuildTest(__dirname);
});

describe('runtime', () => {
  it('html', async () => {
    const { dom, logFn, errorFn } = await loadHTMLFile(
      path.resolve(__dirname, './dist/index.html')
    );

    expect(dom.window.document.body.innerHTML).toMatchSnapshot();

    await sleep(500);

    expect(dom.window.document.body.innerHTML).toMatchSnapshot();

    expect(logFn.mock.calls.length).toBe(3);
    expect(logFn.mock.calls).toEqual([
      ['Hello First!'],
      ['Hello Second!'],
      ['Hello Third!'],
    ]);
    expect(errorFn.mock.calls.length).toBe(0);
  });
});
