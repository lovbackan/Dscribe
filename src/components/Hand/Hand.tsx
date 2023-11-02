import { SupabaseClient } from '@supabase/supabase-js';
import Card from '../Card/Card';

interface HandProps {
  deck: Array<any>;
  supabase: SupabaseClient;
  setDeck: Function;
  setSelectedCard: Function;
  hand: Array<any>;
  setHand: Function;
}

const Hand = (props: HandProps) => {
  return (
    <div className="m-auto absolute px-24 bottom-0 grid w-[90%] justify-center grid-cols-[repeat(auto-fit,_minmax(0,_max-content))]  max-w-[80%]  h-fill">
      {props.deck.map(card => {
        return card.inHand ? (
          <div
            className="h-[30%] w-52 relative overflow-hidden hover:h-[100%] hover:z-10"
            key={card.id}
          >
            <Card
              card={card}
              key={card.id}
              supabase={props.supabase}
              deck={props.deck}
              setDeck={props.setDeck}
              setSelectedCard={props.setSelectedCard}
              hand={props.hand}
              setHand={props.setHand}
            />
          </div>
        ) : null;
      })}
    </div>
  );
};

export default Hand;
