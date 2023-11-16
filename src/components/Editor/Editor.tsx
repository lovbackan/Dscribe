import { useRef, useState } from 'react';

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
import { useEffect } from 'react';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import ToolbarPlugin from '../../plugins/ToolbarPlugin';
import { CardLinkNode, CardLinkPlugin } from '../../plugins/CardLinkPlugin';

//Fix this any when Card is done enough to be properly typed
interface EditorProps {
  selectedCard?:
    | any
    | {
        id: number;
        name: string;
        text: string;
      };
  card?: any;
  deck: EditorProps['card'][];
  setDeck: Function;
  deckChanges?: any[];
  setDeckChanges?: Function;
  story?: {
    text?: string;
  }; //For main editor from story.text
  stories?: EditorProps['story'][];
  setStory?: Function;
  setStoryChanges?: Function;
  deckViewOpen?: boolean;
}

function SaveOnChange(props: {
  card?: any;
  deck?: any[];
  setDeck?: Function;
  deckChanges?: any[] | undefined;
  setDeckChanges?: Function | undefined;
  story?: { text?: string };
  setStory?: Function;
  setStoryChanges?: Function;
}): null {
  const [editor] = useLexicalComposerContext();
  const {
    card,
    deck,
    setDeck,
    deckChanges,
    setDeckChanges,
    story,
    setStory,
    setStoryChanges,
  } = props;
  const [saveTimer, setSaveTimer] = useState(500);
  const saveTimerRef = useRef(saveTimer);
  saveTimerRef.current = saveTimer;

  useEffect(() => {
    setTimeout(saveCountDown, 100);
  }, []);

  const saveCountDown = () => {
    const saveTimer = saveTimerRef.current;
    if (saveTimer > 0) {
      const newSaveTimer = saveTimer - 100;
      setSaveTimer(newSaveTimer);
      if (newSaveTimer <= 0) {
        save();
      }
    }
    setTimeout(saveCountDown, 100);
  };

  const save = () => {
    console.log('ost');
    if (card && deck && setDeck && deckChanges && setDeckChanges) {
      const cardIndex = deck.findIndex(deckCard => {
        if (card.id === deckCard.id) return true;
        return false;
      });
      const newText = JSON.stringify(editor.getEditorState());
      const newDeck = deck;
      if (deck[cardIndex].text === newText) return;

      newDeck[cardIndex].text = newText;
      setDeck([...newDeck]);
      const newDeckChanges = deckChanges;
      const deckChangesCardIndex = newDeckChanges?.findIndex(
        deckChangesCard => {
          if (deckChangesCard.id === card.id) return true;
          return false;
        },
      );
      if (deckChangesCardIndex === -1)
        newDeckChanges?.push({ id: card.id, text: newDeck[cardIndex].text });
      else newDeckChanges[deckChangesCardIndex].text = newText;
      setDeckChanges([...newDeckChanges]);
    }
    if (story && setStory && setStoryChanges) {
      const newText = JSON.stringify(editor.getEditorState());
      if (newText === story.text) return;
      const newStory = story;
      newStory.text = newText;
      setStory({ ...newStory });
      setStoryChanges({ text: newText });
    }
  };

  editor.registerUpdateListener(() => {
    setSaveTimer(500);
  });

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
  const {
    card,
    deck,
    setDeck,
    deckChanges,
    setDeckChanges,
    story,
    setStory,
    setStoryChanges,
  } = props;

  //Get state from connected card, if there is one.
  let initialEditorState = null;
  let editorState = null;
  if (story?.text) {
    editorState = story.text;
  } else if (card) {
    const cardIndex = deck.findIndex(deckCard => {
      if (card.id === deckCard.id) return true;
      return false;
    });

    if (cardIndex === -1) return;

    editorState = deck[cardIndex].text;
  }

  //Set initial state if editorState not empty. Lexical can't handle empty editor states.
  if (editorState) {
    const decodedEditorState = JSON.parse(editorState);
    if (
      decodedEditorState &&
      decodedEditorState.root.children &&
      decodedEditorState.root.children[0]
    ) {
      initialEditorState = editorState;
    }
  }
  return (
    <LexicalComposer
      initialConfig={{
        ...editorConfig,
        editorState: initialEditorState,
      }}
    >
      <div
        id="editorContainer"
        className=" rounded-sm text-black relative leading-5  font-normal text-left rounded-tl-lg rounded-tr-lg w-full h-[84%]"
      >
        <ToolbarPlugin deckViewOpen={props.deckViewOpen} />
        <div
          id="editorInner"
          className={`w-full ${
            props.deckViewOpen ? 'bg-[#0B0B0B]' : 'bg-white'
          } relative h-full `}
        >
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[150px] overflow-y-auto h-full w-full resize-none text-[15px] relative outline-none px-2.5 py-4" />
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <SaveOnChange
            card={card}
            deck={deck}
            setDeck={setDeck}
            deckChanges={deckChanges}
            setDeckChanges={setDeckChanges}
            story={story}
            setStory={setStory}
            setStoryChanges={setStoryChanges}
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
