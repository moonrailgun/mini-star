import { Editor } from './components/Editor';
import { Previewer } from './components/Previewer';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import defaultCapitalApp from './defaultFiles/defaultCapitalApp?raw';
import defaultMiniStarRC from './defaultFiles/defaultMiniStarRC?raw';

import * as rollup from '@rollup/browser';
import { dirname, resolve } from './utils/path';
import { supportsCodeSplitting, supportsInput } from './utils/version';

function App() {
  const codeSplitting = supportsCodeSplitting(rollup.VERSION);
  const handleCompile = async () => {
    // https://github.com/rollup/rollup/issues/3012#issuecomment-517094597
    // https://github.com/rollup/rollupjs.org/blob/master/src/stores/rollupOutput.js

    console.clear();
    console.log(
      `running Rollup version %c${rollup.VERSION}`,
      'font-weight: bold'
    );

    const modules = [
      {
        name: 'main.js',
        code: "console.log('Hello World!')",
        isEntry: true,
      },
    ];

    const moduleById: Record<string, typeof modules[number]> = {};
    modules.forEach((module) => {
      moduleById[module.name] = module;
    });

    const warnings: any[] = [];
    const inputOptions: any = {
      plugins: [
        {
          resolveId(importee: string, importer: string) {
            if (!importer) return importee;
            if (importee[0] !== '.') return false;

            let resolved = resolve(dirname(importer), importee).replace(
              /^\.\//,
              ''
            );
            if (resolved in moduleById) {
              return resolved;
            }

            resolved += '.js';
            if (resolved in moduleById) {
              return resolved;
            }

            throw new Error(
              `Could not resolve '${importee}' from '${importer}'`
            );
          },
          load: function (id: any) {
            return moduleById[id].code;
          },
        },
      ],
      onwarn(warning: any) {
        warnings.push(warning);

        console.group(warning.loc ? warning.loc.file : '');

        console.warn(warning.message);

        if (warning.frame) {
          console.log(warning.frame);
        }

        if (warning.url) {
          console.log(`See ${warning.url} for more information`);
        }

        console.groupEnd();
      },
    };
    if (codeSplitting) {
      inputOptions.input = modules
        .filter((module, index) => index === 0 || module.isEntry)
        .map((module) => module.name);
    } else {
      inputOptions[supportsInput(rollup.VERSION) ? 'input' : 'entry'] =
        'main.js';
    }

    try {
      const generated = await (await rollup.rollup(inputOptions)).generate({});

      console.log({
        output: supportsCodeSplitting(rollup.VERSION)
          ? generated.output
          : [generated],
        warnings,
        error: null,
      });
    } catch (err) {
      console.error(err);

      console.log({
        output: [],
        warnings,
        error: null,
      });
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center">
          <img className="h-8 w-8 mr-2" src="/logo.svg" />
          <div>MiniStar Playground</div>
        </div>

        <div
          className="text-white bg-green-500 rounded px-3 py-1 cursor-pointer hover:bg-green-400"
          onClick={handleCompile}
        >
          Run(WIP)
        </div>
      </div>

      <div className="flex flex-1">
        <Allotment>
          <Allotment.Pane>
            <Allotment vertical={true}>
              <Allotment.Pane>
                <Editor
                  defaultValue={defaultCapitalApp}
                  language="typescript"
                />
              </Allotment.Pane>
              <Allotment.Pane>
                <Editor
                  title=".ministarrc.json"
                  defaultValue={defaultMiniStarRC}
                  language="json"
                />
              </Allotment.Pane>
            </Allotment>
          </Allotment.Pane>
          <Allotment.Pane>
            <Previewer />
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
}

export default App;
