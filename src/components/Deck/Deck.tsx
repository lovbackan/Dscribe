//import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { SupabaseClient } from '@supabase/supabase-js';

interface DeckProps {
  supabase: SupabaseClient;
  setSelectedCard: Function;
  setDeck: Function;
  deck: Array<any>;
  hand: Array<any>;
  setHand: Function;
}

const Deck = (props: DeckProps) => {
  return (
    <>
      <div className="flex flex-wrap gap-10 m-[10%] ">
        {props.deck.map(card => {
          return (
            <Card
              key={card.id}
              supabase={props.supabase}
              card={card}
              setSelectedCard={props.setSelectedCard}
              deck={props.deck}
              setDeck={props.setDeck}
              hand={props.hand}
              setHand={props.setHand}
            />
          );
        })}
      </div>
    </>
  );
};

export default Deck;
