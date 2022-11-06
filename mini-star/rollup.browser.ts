import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import { RollupOptions, WarningHandlerWithDefault } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import replaceBrowserModules from './build/replace-browser-modules';

const onwarn: WarningHandlerWithDefault = (warning) => {
  // eslint-disable-next-line no-console
  console.error(
    'Building Rollup produced warnings that need to be resolved. ' +
      'Please keep in mind that the browser build may never have external dependencies!'
  );
  throw Object.assign(new Error(), warning);
};

const browserBuilds: RollupOptions = {
  input: 'bundler/browser/entry.ts',
  onwarn,
  output: [
    // {
    //   // banner: getBanner,
    //   file: 'browser/dist/mini-star.browser.js',
    //   format: 'umd',
    //   name: 'ministar',
    //   // plugins: [copyTypes('mini-star.browser.d.ts')],
    //   sourcemap: true,
    // },
    {
      // banner: getBanner,
      file: 'browser/dist/es/mini-star.browser.js',
      format: 'es',
      // plugins: [emitModulePackageFile()],
    },
  ],
  plugins: [
    replaceBrowserModules(),
    nodeResolve({ browser: true, preferBuiltins: true }),
    json(),
    commonjs(),
    typescript({
      declaration: false,
    }),
  ],
  strictDeprecations: true,
  // treeshake,
};

export default browserBuilds;
