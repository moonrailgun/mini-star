#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { createPluginTemplate } from './create-plugin';
import path from 'path';
import { bundlePlugin } from '../bundler/bundle';
import { getPluginDirs } from '../bundler/utils';
import { config } from '../bundler/config';
import ora from 'ora';

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
    async (argv) => {
      const pluginName = argv['pluginName'] as string;

      async function bundleSinglePlugin(name: string) {
        const pluginPackageJsonPath = path.resolve(
          config.pluginRoot,
          './plugins/',
          name,
          './package.json'
        );
        const spinner = ora(`Building plugin [${name}]...`).start();
        const startTime = new Date().valueOf();

        try {
          await bundlePlugin(pluginPackageJsonPath);
          const usage = new Date().valueOf() - startTime;
          spinner.succeed(`Bundle [${name}] success in ${usage}ms!`);
        } catch (err) {
          spinner.fail(`Bundle [${name}] error`);
          console.error(err);
        }
      }

      if (pluginName === 'all') {
        for (const name of getPluginDirs()) {
          await bundleSinglePlugin(name);
        }
      } else {
        await bundleSinglePlugin(pluginName);
      }
    }
  )
  .demandCommand(1).argv;
