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
import { CardLinkPlugin } from '../../plugins/CardLinkPlugin';
import { CardLinkNode } from '../../plugins/CardLinkPlugin';

interface EditorProps {
  editorState: string | undefined;
}

function Placeholder() {
  return <div className="editor-placeholder"></div>;
}

const editorConfig = {
  namespace: 'MyEditor',
  // The editor theme
  theme: exampleTheme,
  editable: false,
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

const RichTextViewer = (props: EditorProps) => {
  function UpdateState(): null {
    const [editor] = useLexicalComposerContext();
    React.useEffect(() => {
      if (props.editorState) {
        const decodedEditorState = JSON.parse(props.editorState);
        if (
          decodedEditorState &&
          decodedEditorState.root.children &&
          decodedEditorState.root.children[0]
        )
          editor.setEditorState(editor.parseEditorState(props.editorState));
      }
    }, [props.editorState]);
    return null;
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div
        id=" editor-container"
        className=" rounded-sm text-black relative leading-5  font-normal text-left rounded-tl-lg rounded-tr-lg w-full h-[84%]"
      >
        <div
          id=" editor-inner"
          className=" w-full relative h-full bg-white rounded-t-lg"
        >
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <CardLinkPlugin />
          <HistoryPlugin />
          <UpdateState />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default RichTextViewer;
