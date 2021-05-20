import fs from 'fs';
import path from 'path';
import { config } from './config';

/**
 * Find plugin dir names
 */
export function getPluginDirs(): string[] {
  const list = fs.readdirSync(path.resolve(config.pluginRoot, './plugins/'));

  const plugins = list.filter((item) =>
    fs
      .statSync(path.resolve(config.pluginRoot, './plugins/', item))
      .isDirectory()
  );

  return plugins;
}
