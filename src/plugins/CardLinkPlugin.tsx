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
  $getNodeByKey,
} from 'lexical';

import { deckContext, setDeckContext } from '../pages/EditorPage';
import { useContext } from 'react';
import { $isElementNode } from 'lexical';

type SerializedCardLinkNode = { cardId: number } & SerializedElementNode;

//I suspect this is pretty bad practice but it works for now. I should circle back to this when I understand Lexical better. //Dan 30-10-2023
let deck: any[] | undefined;
let setDeck: Function | undefined;
let editor: LexicalEditor;

export class CardLinkNode extends ElementNode {
  private __cardId: number;
  static getType(): string {
    return 'cardLink';
  }

  constructor(cardId = -1, key?: NodeKey) {
    super(key);
    this.__cardId = cardId;
  }

  //Lots of testing functionality for now. Should just set __cardId //Dan 30-10-2023
  setCardId(cardId: number) {
    const self = this.getWritable();
    self.__cardId = cardId;

    if (deck) {
      const index = deck.findIndex((card: any) => {
        if (card.id === cardId) {
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
      type: 'cardLink',
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
    //This could possible give us access to Editor! //Dan 02/11/2023 getNearestEditorFromDOMNode
    element.onclick = () => {
      //Should display linked card in popup //Dan 31/10/2023
      const cardId = this.__cardId;
      const index = deck?.findIndex(card => {
        if (cardId === card.id) return true;
        else return false;
      });
      if (deck && index != undefined && index >= 0) {
        const newDeck = deck;
        newDeck[index].openCard = !deck[index].openCard;
        if (setDeck) setDeck([...newDeck]);
      }

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
    // this awesome code is made to prevent building error on vercel
    let selectioon = selection;
    selectioon = selectioon;

    const newBlock = $createParagraphNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.insertAfter(newBlock, restoreSelection);
    return newBlock;
  }

  canBeEmpty() {
    return false;
  }

  canInsertTextBefore() {
    return false;
  }

  canInsertTextAfter() {
    return false;
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

function $getAncestor(node: LexicalNode | null, predicate: Function) {
  let parent = node;
  while (
    parent !== null &&
    (parent = parent.getParent()) !== null &&
    !predicate(parent)
  );

  return parent;
}

function $getCardLinkAncestor(node: LexicalNode) {
  return $getAncestor(node, $isCardLinkNode);
}

export const INSERT_CARDLINK_COMMAND = createCommand('insertCardLink');

export function CardLinkPlugin(): null {
  deck = useContext(deckContext);
  setDeck = useContext(setDeckContext);
  [editor] = useLexicalComposerContext();

  if (!editor.hasNode(CardLinkNode)) {
    throw new Error('CardLinkPlugin: CardLink not registered on editor');
  }

  editor.registerCommand(
    INSERT_CARDLINK_COMMAND,
    (cardId: number): any => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return true;
      const nodes = selection.extract();

      if (cardId === null) {
        // Remove CardLinkNodes from copying LinkNodes. Maybe useless //Dan
        nodes.forEach(node => {
          const parent = node.getParent();

          if ($isCardLinkNode(parent)) {
            const children = parent.getChildren();

            for (let i = 0; i < children.length; i++) {
              parent.insertBefore(children[i]);
            }

            parent.remove();
          }
        });
      } else {
        // Add or merge LinkNodes /Mergin doesn't seem to happen. Probably artifact from how linkNodes work which this is copied from. //Dan
        if (nodes.length === 1) {
          const firstNode = nodes[0]; // if the first node is a LinkNode or if its
          // parent is a LinkNode, we update the URL, target and rel.

          const cardLinkNode = $isCardLinkNode(firstNode)
            ? firstNode
            : $getCardLinkAncestor(firstNode);

          if (cardLinkNode !== null) {
            if (cardId !== undefined) {
              cardLinkNode.setCardId(cardId);
            }

            return;
          }
        }

        let prevParent: LexicalNode | null = null;
        let cardLinkNode: CardLinkNode | null = null;
        nodes.forEach(node => {
          const parent = node.getParent();

          if (
            parent === cardLinkNode ||
            parent === null ||
            ($isElementNode(node) && !node.isInline())
          ) {
            return;
          }

          if ($isCardLinkNode(parent)) {
            cardLinkNode = parent;

            if (cardId !== undefined) {
              cardLinkNode.setCardId(cardId);
            }

            return;
          }

          if (!parent.is(prevParent)) {
            prevParent = parent;
            cardLinkNode = $createCardLinkNode(cardId);

            if ($isCardLinkNode(parent)) {
              if (node.getPreviousSibling() === null) {
                parent.insertBefore(cardLinkNode);
              } else {
                parent.insertAfter(cardLinkNode);
              }
            } else {
              node.insertBefore(cardLinkNode);
            }
          }

          if ($isCardLinkNode(node)) {
            if (node.is(cardLinkNode)) {
              return;
            }

            if (cardLinkNode !== null) {
              const children = node.getChildren();

              for (let i = 0; i < children.length; i++) {
                cardLinkNode.append(children[i]);
              }
            }

            node.remove();
            return;
          }

          if (cardLinkNode !== null) {
            cardLinkNode.append(node);
          }
        });
        const newNodes = selection.getNodes();
        console.log('Old nodes:', nodes);
        console.log('New nodes:', newNodes);
        cardLinkNode = null;

        //Merge adjacent nodes
        newNodes.forEach(node => {
          if ($isCardLinkNode(node)) {
            if (cardLinkNode === null) {
              cardLinkNode = node;
              return;
            }

            if (node.__prev && $getNodeByKey(node.__prev) === cardLinkNode) {
              const children = node.getChildren();
              children.forEach(child => {
                if (cardLinkNode != null) cardLinkNode.append(child);
              });
              node.remove();
            }
          }

          if ($isCardLinkNode(node)) {
            cardLinkNode = node;
            return;
          }
        });
      }
      return true;
    },
    COMMAND_PRIORITY_LOW,
  );
  return null;
}
