// DeckView.tsx

import React from 'react';
import Card from '../Card/Card';

import { SupabaseClient } from '@supabase/supabase-js';

interface DeckViewProps {
  showDeckView: boolean;
  supabase: SupabaseClient;
  setSelectedCard: Function;
  setDeck: Function;
  deck: Array<any>;
  hand: Array<any>;
  setHand: Function;
}

export const DeckView: React.FC<DeckViewProps> = (props: DeckViewProps) => {
  if (props.showDeckView === false) return null;
  return (
    <div
      id="deckView"
      className="w-[80%] h-[50%] absolute z-10 bg-slate-500 top-0"
    >
      <h1>DeckView</h1>
      {/* map over deck and display cards */}

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
    </div>
  );
};
