import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  COMMAND_PRIORITY_LOW,
  createCommand,
  type LexicalNode,
  type EditorConfig,
  type NodeKey,
  $getSelection,
  $isRangeSelection,
  ElementNode,
} from 'lexical';

import { $setBlocksType } from '@lexical/selection';

export class CardLinkNode extends ElementNode {
  static getType(): string {
    return 'cardlink';
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  static clone(node: CardLinkNode): CardLinkNode {
    return new CardLinkNode(node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    //render element
    const element = document.createElement('span');
    //give element classname
    element.className = config.theme.cardlink;

    return element;
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig,
  ): boolean {
    //you will need to change this if you want lexical to update the dom for you, when things change (may be useful)
    return false;
  }
}

export function $createCardLinkNode(): CardLinkNode {
  return new CardLinkNode();
}

// If you need this functionality you can uncomment it
export function $isCardLinkNode(node: LexicalNode): node is CardLinkNode {
  return node instanceof CardLinkNode;
}

export const INSERT_CARD_LINK_COMMAND = createCommand('insertCardLink');

export function CardLinkPlugin(): null {
  const [editor] = useLexicalComposerContext();
  //the tutorial has written ([CardLinkNode])
  if (!editor.hasNode(CardLinkNode)) {
    throw new Error('CardLinkPlugin: CardLink not registered on editor');
  }
  //if you want to ovveride lexical stuff change the command priority
  editor.registerCommand(
    INSERT_CARD_LINK_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, $createCardLinkNode);
      }
      return true;
    },
    COMMAND_PRIORITY_LOW,
  );
  return null;
}
