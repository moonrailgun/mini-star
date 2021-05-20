#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { createPluginTemplate } from './create-plugin';
import path from 'path';
import { bundlePlugin } from '../bundler/bundle';
import { getPluginDirs } from '../bundler/utils';
import { config } from '../bundler/config';

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
        console.log('Start to bundle plugin:', name);
        const pluginPackageJsonPath = path.resolve(
          config.pluginRoot,
          './plugins/',
          name,
          './package.json'
        );
        const startTime = new Date().valueOf();
        bundlePlugin(pluginPackageJsonPath)
          .then(() => {
            const usage = new Date().valueOf() - startTime;
            console.log(`Bundle ${name} success in ${usage}ms!`);
          })
          .catch((err) => {
            console.error(`Bundle ${name} error:`, err);
          });
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
