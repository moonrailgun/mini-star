import React from 'react';
import MonacoEditor, { EditorProps } from '@monaco-editor/react';

export const Editor: React.FC<EditorProps & { title?: string }> = React.memo(
  (props) => {
    return (
      <div className="h-full w-full flex flex-col">
        {props.title && <div className="px-3 py-1">{props.title}</div>}

        <MonacoEditor className="flex-1" theme="vs-dark" {...props} />
      </div>
    );
  }
);
Editor.displayName = 'Editor';
