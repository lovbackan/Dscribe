import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  LexicalEditor,
  NodeKey,
  COMMAND_PRIORITY_LOW,
  createCommand,
  type LexicalNode,
  type EditorConfig,
  $getSelection,
  $isRangeSelection,
  ElementNode,
  $createParagraphNode,
  RangeSelection,
  SerializedElementNode,
} from 'lexical';

import { $setBlocksType } from '@lexical/selection';
import { deckContext } from '../components/EditorPage/EditorPage';
import { useContext } from 'react';

type SerializedCardLinkNode = { cardId: number } & SerializedElementNode;

//I suspect this is pretty bad practice but it works for now. I should circle back to this when I understand Lexical better. //Dan 30-10-2023
let deck: undefined | any[];
let editor: LexicalEditor;

export class CardLinkNode extends ElementNode {
  private __cardId: number;
  static getType(): string {
    return 'cardlink';
  }

  constructor(cardId = -1, key?: NodeKey) {
    super(key);
    this.__cardId = cardId;
  }

  //Lots of testing functionality for now. Should just set __cardId //Dan 30-10-2023
  setCardId(cardId: number | false) {
    const self = this.getWritable();
    self.__cardId = this.getCardId() + 1;
    console.log(deck);
    if (deck) {
      const index = deck.findIndex((card: any) => {
        if (card.id === this.getCardId) {
          return true;
        }
        return false;
      });
      console.log(deck[index]);
    }
  }

  getCardId(): number {
    const self = this.getLatest();
    return self.__cardId;
  }

  static clone(node: CardLinkNode): CardLinkNode {
    return new CardLinkNode(node.getCardId(), node.__key);
  }

  //Working on this now //Dan 30-10-2023
  exportJSON(): SerializedCardLinkNode {
    return {
      ...super.exportJSON(),
      type: 'cardlink',
      cardId: this.getCardId(),
    };
  }
  static importJSON(serializedNode: SerializedCardLinkNode): LexicalNode {
    console.log('CardLinkNode imported');
    const node = $createCardLinkNode(serializedNode.cardId);
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }

  //This is where you create the DOM element for the node, here we should
  createDOM(config: EditorConfig): HTMLElement {
    //render element
    const element = document.createElement('span');
    //give element classname
    element.className = config.theme.cardLink;

    element.style.cursor = 'pointer';
    element.onclick = () => {
      //Should display linked card in popup //Dan 31/10/2023
      const cardId = this.__cardId;
      const index = deck?.findIndex(card => {
        console.log(cardId);
        console.log(card.id);
        if (cardId === card.id) return true;
        else return false;
      });
      if (deck && index != undefined && index >= 0) console.log(deck[index]);

      this.__cardId;
      console.log('index: ' + index);
      console.log(deck);
    };

    return element;
  }

  updateDOM(): boolean {
    return true;
  }
  //when u press enter u get a new paragraph node, moving out from the cardlink node
  //I also want to change so that when u press space u get a new text node
  insertNewAfter(
    selection: RangeSelection,
    restoreSelection: boolean,
  ): LexicalNode {
    console.log('insertNewAfter');

    const newBlock = $createParagraphNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.insertAfter(newBlock, restoreSelection);
    return newBlock;
  }

  //remove cardlink node if u delete the first character in the cardlink node
  collapseAtStart(): boolean {
    const paragraph = $createParagraphNode();
    const children = this.getChildren();
    children.forEach(child => paragraph.append(child));
    this.replace(paragraph);
    return true;
  }
}

export function $createCardLinkNode(
  cardId: number | undefined,
  key?: string,
): CardLinkNode {
  return new CardLinkNode(cardId, key);
}

// If you need this functionality you can uncomment it
export function $isCardLinkNode(node: LexicalNode): node is CardLinkNode {
  return node instanceof CardLinkNode;
}

export const INSERT_CARDLINK_COMMAND = createCommand('insertCardLink');

export function CardLinkPlugin(): null {
  deck = useContext(deckContext);
  [editor] = useLexicalComposerContext();

  //the tutorial has written ([CardLinkNode])
  if (!editor.hasNode(CardLinkNode)) {
    throw new Error('CardLinkPlugin: CardLink not registered on editor');
  }

  editor.registerCommand(
    INSERT_CARDLINK_COMMAND,
    (cardId: number) => {
      console.log(cardId);
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createCardLinkNode(cardId));
      }
      return true;
    },
    COMMAND_PRIORITY_LOW,
  );
  return null;
}
