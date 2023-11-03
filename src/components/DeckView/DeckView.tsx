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
      className="  bg-slate-500 overflow-y-auto rounded-3xl px-20 w-[70%] h-[85vh]"
    >
      <div className="">
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

      <div className="flex flex-row w-[100%]">
        {props.deck.map(card => {
          return (
            <CTAButton
              title={card.category_id}
              variant="deckViewCategory"
              onClick={() => {
                console.log(card.category_id);
              }}
            />
          );
        })}
      </div>

      <div className="flex flex-row pb-10">
        <Text textColor="black" variant="heading2" content="Chapters" />

        <div className="w-full h-0.5 bg-black self-end"></div>
      </div>
      <div className="flex flex-row pb-10">
        <Text textColor="black" variant="heading2" content="Cards" />

        <div className="w-full h-0.5 bg-black self-end"></div>
      </div>
      <div className="flex flex-wrap gap-10 my-2 justify-center items-center">
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
              variant="deckCard"
            />
          );
        })}
      </div>
    </div>
  );
};
