import { SupabaseClient } from '@supabase/supabase-js';
// 18-10-2023 Mostly just functionality for testing database.
interface CardProps {
  card: {
    name: string;
    id: number;
  };
  supabase: SupabaseClient;
  deck: Array<any>;
  setDeck: Function;
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
  };

  return (
    <>
      <div className=" bg-green-500 h-60">
        {props.card.name}
        <button className=" bg-red-500 w-20 h-20" onClick={() => removeSelf()}>
          remove
        </button>
      </div>
    </>
  );
};

export default Card;
