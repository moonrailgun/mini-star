#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { createPluginTemplate } from './create-plugin';
import path from 'path';
import { bundlePlugin } from '../bundler/bundle';
import { getPluginDirs } from '../bundler/utils';

yargs(hideBin(process.argv))
  .command(
    'createPlugin',
    'Create a new Plugin',
    (yargs) => {
      yargs;
      // .option('name', {
      //   describe: 'Plugin Name',
      // })
    },
    () => {
      createPluginTemplate();
    }
  )
  .command(
    'buildPlugin <pluginName>',
    'Bundle Plugin',
    () => {},
    (argv) => {
      const pluginName = argv['pluginName'] as string;

      function bundleSinglePlugin(name: string) {
        const pluginPackageJsonPath = path.resolve(
          process.cwd(),
          './plugins/',
          name,
          './package.json'
        );
        bundlePlugin(pluginPackageJsonPath);
      }

      if (pluginName === 'all') {
        for (const name of getPluginDirs()) {
          bundleSinglePlugin(name);
        }
      } else {
        bundleSinglePlugin(pluginName);
      }
    }
  )
  .demandCommand(1).argv;
