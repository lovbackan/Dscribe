import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  SerializedLexicalNode,
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

type SerializedBannerNode = { cardId: number } & SerializedElementNode;

//I suspect this is pretty bad practice but it works for now. I should circle back to this when I understand Lexical better. //Dan 30-10-2023
let deck: undefined | any[];
let editor: LexicalEditor;

export class BannerNode extends ElementNode {
  __cardId: number;
  static getType(): string {
    return 'banner';
  }

  constructor(cardId = -1, key?: NodeKey) {
    super(key);
    this.__cardId = cardId;
  }

  //Lots of testing functionality for now. Should just set __cardId //Dan 30-10-2023
  setCardId(cardId: number | false) {
    // editor.registerMutationListener(BannerNode, () => {});
    const self = this.getWritable();
    self.__cardId = this.__cardId + 1;
    console.log(deck);
    if (deck) {
      const index = deck.findIndex((card: any) => {
        if (card.id === this.__cardId) {
          return true;
        }
        return false;
      });
      console.log(deck[index]);
    }
  }

  getCardId(): number {
    return this.__cardId;
  }

  static clone(node: BannerNode): BannerNode {
    return new BannerNode(undefined, node.__key);
  }

  //Working on this now //Dan 30-10-2023
  exportJSON(): SerializedBannerNode {
    console.log(self);
    console.log(this); //For some reason the __cardId field has its value from the constructor inside of this function but not in the onClick... I think I may be updating it incorrectly.
    console.log(this.getCardId());
    // console.log('BannerNode exported. cardId = ' + this.getCardId());
    return {
      ...super.exportJSON(),
      type: 'banner',
      cardId: this.__cardId,
    };
  }
  static importJSON(serializedNode: SerializedBannerNode): LexicalNode {
    console.log('Bannernode imported');
    const node = $createBannerNode(serializedNode.cardId);

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
    element.className = config.theme.banner;

    element.style.cursor = 'pointer';
    element.onclick = () => {
      // Handle click event here
      //This is very WIP and testing functionality atm. Will be looked over and fixed. //Dan 30-10-2023
      editor.update(() => this.setCardId(0));
      console.log(this.__cardId);
      console.log(this);

      // This would be how we could make things happen depending on written text etc. Potenially relevant. //Dan 30-10-2023
      // editorTest[0].registerNodeTransform(BannerNode, bannerNode =>
      //   if(something) do something with bannerNode.setCardId(55)
      // );
    };

    return element;
  }

  updateDOM(): boolean {
    return true;
  }
  //when u press enter u get a new paragraph node, moving out from the banner node
  //I also want to change so that when u press space u get a new text node
  insertNewAfter(
    selection: RangeSelection,
    restoreSelection: boolean,
  ): LexicalNode {
    const newBlock = $createParagraphNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.insertAfter(newBlock, restoreSelection);
    return newBlock;
  }

  //remove banner node if u delete the first character in the banner node
  collapseAtStart(): boolean {
    const paragraph = $createParagraphNode();
    const children = this.getChildren();
    children.forEach(child => paragraph.append(child));
    this.replace(paragraph);
    return true;
  }
}

export function $createBannerNode(
  cardId: number | undefined,
  key?: string,
): BannerNode {
  return new BannerNode(cardId, key);
}

// If you need this functionality you can uncomment it
export function $isBannerNode(node: LexicalNode): node is BannerNode {
  return node instanceof BannerNode;
}

export const INSERT_BANNER_COMMAND = createCommand('insertBanner');

export function BannerPlugin(): null {
  deck = useContext(deckContext);
  [editor] = useLexicalComposerContext();

  //the tutorial has written ([BannerNode])
  if (!editor.hasNode(BannerNode)) {
    throw new Error('BannerPlugin: CardLink not registered on editor');
  }

  editor.registerCommand(
    INSERT_BANNER_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createBannerNode(undefined));
      }
      return true;
    },
    COMMAND_PRIORITY_LOW,
  );
  return null;
}
