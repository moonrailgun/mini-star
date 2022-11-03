import type { Component } from 'solid-js';
import Editor from './components/Editor';

const App: Component = () => {
  return (
    <>
      <p class="text-4xl text-green-700 text-center py-20">Hello tailwind!</p>
      <div class="h-40">
        <Editor url={`file:///mini-star/main`} />
      </div>
    </>
  );
};

export default App;
