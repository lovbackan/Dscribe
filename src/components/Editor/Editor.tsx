import React from 'react';

import exampleTheme from '../../themes/ExampleTheme';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import ToolbarPlugin from '../../plugins/ToolbarPlugin';
import { EditorState } from 'lexical';
import { CardLinkNode, CardLinkPlugin } from '../../plugins/CardLinkPlugin';

// import TreeViewPlugin from "./plugins/TreeViewPlugin";
// import ToolbarPlugin from "./plugins/ToolbarPlugin";
// import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
// import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
// import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

//Fix this any when Card is done enough to be properly typed
interface EditorProps {
  setEditorState: Function;
  selectedCard?:
    | any
    | {
        id: number;
        name: string;
        text: string;
      };
}

//Gör en riktig state och spara texten i.
function MyOnChangeFunction(props: {
  onChange: (editorState: EditorState) => void;
}): null {
  const [editor] = useLexicalComposerContext(); //essential part of every lexical plugin
  const { onChange } = props;
  editor.registerUpdateListener(({ editorState }) => {
    onChange(editorState);
  });

  return null;
}

//Fix this any. Make selectedCard interface or something
function UpdateState(props: any): null {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    if (props.selectedCard) {
      console.log(props.selectedCard);
      editor.setEditorState(editor.parseEditorState(props.selectedCard.text));
    }
  }, [props.selectedCard]);
  return null;
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  namespace: 'MyEditor',
  // The editor theme
  theme: exampleTheme,
  // Handling of errors during update
  onError(error: any) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    CardLinkNode,
  ],
};

const Editor = (props: EditorProps) => {
  const { selectedCard } = props;
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MyOnChangeFunction
            onChange={editorState => {
              props.setEditorState(editorState);
            }}
          />
          <UpdateState selectedCard={selectedCard} />
          <CardLinkPlugin />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Editor;
