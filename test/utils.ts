import { execSync } from 'child_process';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

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

export async function loadHTMLFile(filepath: string) {
  const dom = await JSDOM.fromFile(filepath, {
    resources: 'usable',
    runScripts: 'dangerously',
  });

  return { dom };
}

/**
 * JavaScript 中的 sleep 函数
 * 参考 https://github.com/sqren/await-sleep/blob/master/index.js
 * @param milliseconds 阻塞毫秒
 */
export function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
