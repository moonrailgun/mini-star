#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { createPluginTemplate } from './create-plugin';
import { buildPlugin, watchPlugin } from '../bundler/bundle';
import { getPluginDirContainerPath, getPluginDirs } from '../bundler/utils';
import ora from 'ora';
import { getPluginPackagePath, getShortTimeStr } from './utils';

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
        const pluginPackageJsonPath = getPluginPackagePath(name);
        const spinner = ora(`Building plugin [${name}]...`).start();
        const startTime = new Date().valueOf();

        try {
          await buildPlugin(pluginPackageJsonPath);
          const usage = new Date().valueOf() - startTime;
          spinner.succeed(`Bundle [${name}] success in ${usage}ms!`);
        } catch (err) {
          spinner.fail(`Bundle [${name}] error`);
          console.error(err);
        }
      }

      if (pluginName === 'all') {
        const allPluginDirs = getPluginDirs();
        if (allPluginDirs.length === 0) {
          console.warn('Not found and plugin in:', getPluginDirContainerPath());
        }

        for (const name of getPluginDirs()) {
          await bundleSinglePlugin(name);
        }
      } else {
        await bundleSinglePlugin(pluginName);
      }
    }
  )
  .command(
    'watchPlugin <pluginName>',
    'Build and watch Plugin',
    () => {},
    async (argv) => {
      const pluginName = argv['pluginName'] as string;

      async function watchSinglePlugin(name: string) {
        const pluginPackageJsonPath = getPluginPackagePath(name);

        const watcher = watchPlugin(pluginPackageJsonPath);

        const spinner = ora({
          prefixText: () => `[${getShortTimeStr()}]: [${name}] `,
        });
        watcher.on('event', (event) => {
          if (event.code === 'BUNDLE_START') {
            spinner.start(`Building ${event.output.join(',')}`);
          } else if (event.code === 'BUNDLE_END') {
            spinner.succeed(`Building Successful in ${event.duration}ms`);
          } else if (event.code === 'ERROR') {
            spinner.fail(`Build Error: ${event.error.message}`);
          }
        });
      }

      if (pluginName === 'all') {
        for (const name of getPluginDirs()) {
          await watchSinglePlugin(name);
        }
      } else {
        await watchSinglePlugin(pluginName);
      }
    }
  )
  .demandCommand(1).argv;
