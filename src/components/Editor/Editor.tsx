import React, { useRef, useState } from 'react';
import { supabase } from '../../supabase';
import { useEffect } from 'react';
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
  card?: any;
  deck: EditorProps['card'][];
}

function MyOnChangeFunction(props: {
  onChange: (editorState: EditorState) => void;
}): null {
  const [editor] = useLexicalComposerContext();
  const { onChange } = props;
  editor.registerUpdateListener(({ editorState }) => {
    onChange(editorState);
  });

  return null;
}

//Fix this any. Make selectedCard interface or something
function SaveTimerPlugin(props: {
  saveTimerRef: any;
  card: any;
  setSaveTimer: Function;
}): null {
  const { saveTimerRef, card, setSaveTimer } = props;
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    countdown();
  }, []);

  const countdown = async () => {
    if (saveTimerRef.current > 0) {
      const newSaveTimer = saveTimerRef.current - 100;
      setSaveTimer(newSaveTimer);
      if (newSaveTimer <= 0) {
        if (card) {
          const text = JSON.stringify(editor.getEditorState());
          if (text !== card.text) {
            card.text = text;
            const result = await supabase
              .from('cards')
              .update({ text: text })
              .eq('id', card.id);
            console.log(result);
          }
        }
      }
    }
    console.log(saveTimerRef.current);
    setTimeout(countdown, 100);
  };
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
  const { selectedCard, card, deck } = props;
  const saveCooldown = 1000;
  const [saveTimer, setSaveTimer] = useState<number>(0);
  const saveTimerRef = useRef(saveTimer);
  saveTimerRef.current = saveTimer;

  //Get state from connected card, if there is one.
  let initialEditorState = null;
  if (card) {
    const cardIndex = deck.findIndex(deckCard => {
      if (card.id === deckCard.id) return true;
      return false;
    });

    if (cardIndex === -1) return;
    initialEditorState = deck[cardIndex].text;
  }
  return (
    <LexicalComposer
      initialConfig={{
        ...editorConfig,
        editorState: initialEditorState,
      }}
    >
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
              setSaveTimer(saveCooldown);
            }}
          />
          <SaveTimerPlugin
            saveTimerRef={saveTimerRef}
            setSaveTimer={setSaveTimer}
            card={card}
          />
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
