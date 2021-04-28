import { execSync } from 'child_process';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

const UTF8_FRIENDLY_EXTS = [
  'css',
  'html',
  'js',
  'map',
  'jsx',
  'ts',
  'tsx',
  'svelte',
  'svg',
  'vue',
  'json',
]; // only read non-binary files (add more exts here as needed)

/**
 * setup for /tests/plugins/*
 */
export function setupBuildTest(cwd: string) {
  return execSync('yarn testbuild', { cwd });
}

/**
 * Read a directory of files
 */
export function readFiles(directory: string) {
  if (typeof directory !== 'string') {
    throw new Error(`must specify directory`);
  }

  const contents: Record<string, string> = {};
  const allFiles = glob.sync(`**/*.{${UTF8_FRIENDLY_EXTS.join(',')}}`, {
    cwd: directory,
    nodir: true,
  });

  allFiles.forEach((filepath) => {
    const relativePath = filepath.replace(/^\/?/, '/');
    contents[relativePath] = fs.readFileSync(
      path.join(directory, filepath),
      'utf8'
    );
  });

  return contents;
}
