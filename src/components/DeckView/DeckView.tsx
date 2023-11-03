// DeckView.tsx

import React from 'react';
import Card from '../Card/Card';

import { SupabaseClient } from '@supabase/supabase-js';
import { CTAButton } from '../CTAButton/CTAButton';
import { Input } from '../Input/Input';
import { Text } from '../Text/Text';

interface DeckViewProps {
  showDeckView: boolean;
  supabase: SupabaseClient;
  setSelectedCard: Function;
  setDeck: Function;
  deck: Array<any>;
  hand: Array<any>;
  setHand: Function;
  toggleDeckView: Function;
}

export const DeckView: React.FC<DeckViewProps> = (props: DeckViewProps) => {
  if (props.showDeckView === false) return null;
  return (
    <div
      id="deckView"
      className="w-[80%] h-[80%] absolute z-10 bg-slate-500 top-0 overflow-y-auto rounded-3xl"
    >
      <div className="absolute right-0">
        <CTAButton
          title="X"
          variant="primary"
          onClick={() => {
            console.log('close deck view');
            props.toggleDeckView();
          }}
        />
      </div>
      <h1>DeckView</h1>
      {/* map over deck and display cards */}

      <div className="flex flex-row">
        <Text variant="heading2" content="Filter" textColor="black" />
        <Input
          variant="primary"
          placeholder="Search"
          onChange={() => {
            console.log('u are writing here');
          }}
        />
      </div>
      <div>
        {props.deck.map(card => {
          return (
            <CTAButton
              title={card.category_id}
              variant="deckViewCategory"
              onClick={() => {}}
            />
          );
        })}
      </div>

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
              variant="smallCard"
            />
          );
        })}
      </div>
    </div>
  );
};
