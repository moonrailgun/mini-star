import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import { cosmiconfigSync } from 'cosmiconfig';
const explorer = cosmiconfigSync('ministar');

const defaultConfig = {
  scope: 'template',
};

const configResult = explorer.search();
const config = configResult?.config ?? defaultConfig;

const pluginDir = path.resolve(process.cwd(), './plugins');

export async function createPluginTemplate() {
  const { pluginName, language, confirm } = await inquirer.prompt([
    {
      type: 'input',
      name: 'pluginName',
      message: 'Plugin Name',
      validate(input) {
        if (!input) {
          return 'Require Plugin Name!';
        }

        return true;
      },
    },
    {
      type: 'list',
      name: 'language',
      message: 'Language',
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
        return `Ensure to create plugin: [${answer.pluginName}] ?`;
      },
    },
  ]);

  if (!confirm) {
    return;
  }

  const entryFileName = `src/index.${language}`;

  const prefix = `@${config.scope}/`;
  const uniqPluginName = prefix + pluginName;

  fs.mkdirSync(path.resolve(pluginDir, pluginName));
  fs.mkdirSync(path.resolve(pluginDir, pluginName, 'src'));

  const packageConfig: any = {
    name: uniqPluginName,
    main: entryFileName,
    version: '0.0.0',
    scripts: {
      build: 'rollup --config ../rollup.config.js',
    },
    dependencies: {},
  };
  if (config.author !== undefined) {
    packageConfig.author = config.author;
  }
  if (config.license !== undefined) {
    packageConfig.license = config.license;
  }

  fs.writeFileSync(
    path.resolve(pluginDir, pluginName, 'package.json'),
    JSON.stringify(packageConfig, null, 2)
  );
  fs.writeFileSync(path.resolve(pluginDir, pluginName, entryFileName), '');

  console.log(
    `Plugin [${pluginName}] create completed: ${path.resolve(
      pluginDir,
      pluginName,
      entryFileName
    )}`
  );
}
