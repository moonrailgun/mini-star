import { Editor } from './components/Editor';
import { Previewer } from './components/Previewer';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import defaultCapitalApp from './defaultFiles/defaultCapitalApp?raw';
import defaultMiniStarRC from './defaultFiles/defaultMiniStarRC?raw';

function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center">
          <img className="h-8 w-8 mr-2" src="/logo.svg" />
          <div>MiniStar Playground</div>
        </div>

        <div className="text-white bg-green-500 rounded px-3 py-1 cursor-pointer hover:bg-green-400">
          运行
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
