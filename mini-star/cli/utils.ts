import path from 'path';
import { config } from '../bundler/config';

export function getPluginPackagePath(pluginName: string) {
  return path.resolve(
    config.pluginRoot,
    './plugins/',
    pluginName,
    './package.json'
  );
}

/**
 * Return HH:mm
 */
export function getShortTimeStr(): string {
  const now = new Date();

  return `${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes()
  ).padStart(2, '0')}`;
}
