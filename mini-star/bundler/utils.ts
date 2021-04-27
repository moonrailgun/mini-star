import fs from 'fs';
import path from 'path';

/**
 * Find plugin dir names
 */
export function getPluginDirs(): string[] {
  const list = fs.readdirSync(path.resolve(process.cwd(), './plugins/'));

  const plugins = list.filter((item) =>
    fs.statSync(path.resolve(process.cwd(), './plugins/', item)).isDirectory()
  );

  return plugins;
}
