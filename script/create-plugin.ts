import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';

import ptconfig from '../.ptconfig.json';

const pluginDir = path.resolve(__dirname, '../plugins');

async function run() {
  const { pluginName, language, confirm } = await inquirer.prompt([
    {
      type: 'input',
      name: 'pluginName',
      message: '插件名',
      validate(input) {
        if (!input) {
          return '需要插件名';
        }

        return true;
      },
    },
    {
      type: 'list',
      name: 'language',
      message: '语言',
      choices: [
        {
          name: 'Typescript',
          value: 'ts',
        },
        {
          name: 'Javascript',
          value: 'js',
        },
      ],
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: (answer) => {
        return `确认创建插件: [${answer.pluginName}] ?`;
      },
    },
  ]);

  if (!confirm) {
    return;
  }

  const entryFileName = `index.${language}`;

  const prefix = `@${ptconfig.scope}/`;
  const uniqPluginName = prefix + pluginName;

  fs.mkdirSync(path.resolve(pluginDir, pluginName));
  fs.writeFileSync(
    path.resolve(pluginDir, pluginName, 'package.json'),
    JSON.stringify(
      {
        name: uniqPluginName,
        main: entryFileName,
        scripts: {
          build: 'rollup --config ../rollup.config.js',
        },
      },
      null,
      2
    )
  );
  fs.writeFileSync(path.resolve(pluginDir, pluginName, entryFileName), '');

  console.log(
    `插件 [${pluginName}] 创建完毕: ${path.resolve(
      pluginDir,
      pluginName,
      entryFileName
    )}`
  );
}

run();
