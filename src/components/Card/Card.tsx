import { SupabaseClient } from '@supabase/supabase-js';
import RichTextViewer from '../RichTextViewer/RichTextViewer';
// import { EditorState } from 'lexical';
// 18-10-2023 Mostly just functionality for testing database.
interface CardProps {
  card: {
    name: string;
    id: number;
    category_id: number;
    text: string;
  };
  supabase: SupabaseClient;
  deck: Array<any>;
  setDeck: Function;
  setSelectedCard: Function;
  hand: Array<any>;
  setHand: Function;
}

const Card = (props: CardProps) => {
  const removeSelf = async () => {
    const result = await props.supabase
      .from('cards')
      .delete()
      .match({ id: props.card.id });
    if (result.error) console.log(result.error);
    else {
      const updatedDeck = props.deck;
      const idToRemove = updatedDeck.findIndex(card => {
        if (card.id === props.card.id) return true;
        return false;
      });
      updatedDeck.splice(idToRemove, 1);
      props.setDeck([...updatedDeck]);
    }
    toggleInHand();
  };

  const toggleInHand = () => {
    const newHand = props.hand;

    const cardInHandId = newHand.findIndex(cardInHand => {
      if (props.card.id === cardInHand.id) return true;
      else return false;
    });
    console.log(cardInHandId);
    if (cardInHandId != -1) props.hand.splice(cardInHandId, 1);
    //Remove card from hand if already there.
    else props.hand.push(props.card); //Else add it.
    props.setHand([...newHand]);
  };

  return (
    <>
      <div className=" bg-green-500 h-60 w-[200px] rounded-xl mr-[-20px] hover:z-10 border-4 border-black row-[1]">
        {props.card.name}
        <button className=" bg-red-500 w-20 h-20" onClick={() => removeSelf()}>
          remove
        </button>
        <h2 onClick={() => console.log(props.card.text)}>
          Category Id:{props.card.category_id}
        </h2>
        <button
          onClick={() => {
            props.setSelectedCard(props.card);
          }}
        >
          Select me!
        </button>
        <button
          onClick={() => {
            toggleInHand();
          }}
        >
          Toggle in hand!
        </button>

        <RichTextViewer editorState={props.card.text} />
      </div>
    </>
  );
};

export default Card;
