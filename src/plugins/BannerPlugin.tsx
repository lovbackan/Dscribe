import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
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
  SerializedLexicalNode,
} from 'lexical';

import { $setBlocksType } from '@lexical/selection';
import { deckContext } from '../components/EditorPage/EditorPage';
import { useContext } from 'react';

let deck: undefined | any[];

export class BannerNode extends ElementNode {
  __cardId: false | number;
  static getType(): string {
    return 'banner';
  }

  constructor(key?: NodeKey) {
    super(key);
    this.__cardId = false;
  }

  setCardId(cardId: number | false) {
    const self = this.getWritable();
    self.__cardId = cardId;
  }

  static clone(node: BannerNode): BannerNode {
    return new BannerNode(node.__key);
  }

  // static importJSON() {}
  // exportJSON(): SerializedLexicalNode {
  //   return this.exportJSON();
  // }
  //This is where you create the DOM element for the node, here we should
  createDOM(config: EditorConfig): HTMLElement {
    //render element
    const element = document.createElement('span');
    //give element classname
    element.className = config.theme.banner;

    element.style.cursor = 'pointer';
    element.onclick = () => {
      // Handle click event here
      this.setCardId(55);
      console.log(this.__cardId);
    };

    return element;
  }

  updateDOM(): false {
    return false;
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

export function $createBannerNode(): BannerNode {
  return new BannerNode(undefined);
}

// If you need this functionality you can uncomment it
export function $isBannerNode(node: LexicalNode): node is BannerNode {
  return node instanceof BannerNode;
}

export const INSERT_BANNER_COMMAND = createCommand('insertBanner');

export function BannerPlugin(): null {
  deck = useContext(deckContext);
  const [editor] = useLexicalComposerContext();
  //the tutorial has written ([BannerNode])
  if (!editor.hasNode(BannerNode)) {
    throw new Error('BannerPlugin: CardLink not registered on editor');
  }

  editor.registerCommand(
    INSERT_BANNER_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createBannerNode());
      }
      return true;
    },
    COMMAND_PRIORITY_LOW,
  );
  return null;
}
