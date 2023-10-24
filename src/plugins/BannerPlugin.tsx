import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  COMMAND_PRIORITY_LOW,
  createCommand,
  type LexicalNode,
  type EditorConfig,
  $getSelection,
  $isRangeSelection,
  ElementNode,
  $createParagraphNode,
  RangeSelection,
} from 'lexical';

import { $setBlocksType } from '@lexical/selection';

export class BannerNode extends ElementNode {
  static getType(): string {
    return 'banner';
  }

  // constructor(key?: NodeKey) {
  //   super(key);
  // }

  static clone(node: BannerNode): BannerNode {
    return new BannerNode(node.__key);
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
      console.log('Span clicked!');
    };

    return element;
  }

  updateDOM(): false {
    return false;
  }
  //when u press enter u get a new paragraph node, moving out from the banner node
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

  // updateDOM(
  //   _prevNode: unknown,
  //   _dom: HTMLElement,
  //   _config: EditorConfig,
  // ): boolean {
  //   //you will need to change this if you want lexical to update the dom for you, when things change (may be useful)
  //   return false;
  // }
}

export function $createBannerNode(): BannerNode {
  return new BannerNode();
}

// If you need this functionality you can uncomment it
export function $isBannerNode(node: LexicalNode): node is BannerNode {
  return node instanceof BannerNode;
}

export const INSERT_BANNER_COMMAND = createCommand('insertBanner');

export function BannerPlugin(): null {
  const [editor] = useLexicalComposerContext();
  //the tutorial has written ([BannerNode])
  if (!editor.hasNode(BannerNode)) {
    throw new Error('BannerPlugin: CardLink not registered on editor');
  }
  //if you want to ovveride lexical stuff change the command priority
  editor.registerCommand(
    INSERT_BANNER_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, $createBannerNode);
      }
      return true;
    },
    COMMAND_PRIORITY_LOW,
  );
  return null;
}
