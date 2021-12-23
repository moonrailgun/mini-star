import fs from 'fs';
import path from 'path';
import { config } from './config';

export function getPluginDirContainerPath() {
  return path.resolve(config.pluginRoot, './plugins/');
}

/**
 * Find plugin dir names
 */
export function getPluginDirs(): string[] {
  const list = fs.readdirSync(getPluginDirContainerPath());

  const plugins = list.filter((item) =>
    fs.statSync(path.resolve(getPluginDirContainerPath(), item)).isDirectory()
  );

  return plugins;
}
