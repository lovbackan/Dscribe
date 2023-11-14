// DeckView.tsx

import React from 'react';
import Card from '../Card/Card';
import { useEffect } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { CTAButton } from '../CTAButton/CTAButton';
import { Input } from '../Input/Input';
import { Text } from '../Text/Text';
import { useState } from 'react';

interface DeckViewProps {
  showDeckView: boolean;
  supabase: SupabaseClient;
  setDeck: Function;
  deck: any[];
  toggleDeckView: Function;
  addCard: Function;
  deckChanges: any[];
  setDeckChanges: Function;
  categories: any[];
  setCategories: Function;
  tags: any[];
  setTags: Function;
  createTag: Function;
  createCategory: Function;
}

interface Card {
  card: {
    name: string;
    id: number;
    user_id: string;
    category_id: number | null;
    text: string;
    tags: any[];
    image_path?: string;
    inHand?: Boolean;
    openCard?: Boolean;
    categories: { name: string };
  };
}

export const DeckView: React.FC<DeckViewProps> = (props: DeckViewProps) => {
  const [filteredCards, setFilteredCards] = useState(props.deck);
  const [searchTerm, setSearchTerm] = useState('');
  const [allCards, setAllCards] = useState(props.deck);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCards(allCards);
    } else {
      setFilteredCards(
        allCards.filter(
          card =>
            card && card.name && card.name.toLowerCase().includes(searchTerm),
        ),
      );
    }
  }, [allCards, searchTerm]);

  useEffect(() => {
    setFilteredCards(props.deck);
  }, [props.deck]);

  useEffect(() => {
    setAllCards(props.deck);
  }, [props.deck]);

  if (props.showDeckView === false) return null;
  return (
    <div
      id="deckView"
      className="  bg-slate-500 overflow-y-auto rounded-3xl w-[75vw] h-[85vh]"
    >
      <div className="flex flex-row justify-end ">
        <div className="fixed pr-6 pt-3">
          <CTAButton
            title="X"
            variant="minimize/close"
            onClick={() => {
              console.log('close deck view');
              props.toggleDeckView();
            }}
          />
        </div>
      </div>
      <div className="px-20">
        <div id="title" className="mt-10 ">
          <h1>DeckView</h1>
        </div>
        {/* map over deck and display cards */}

        <div className="flex flex-row">
          <Text variant="heading2" content="Filter" textColor="black" />
          <Input
            type="text"
            id="search"
            variant="primary"
            placeholder="Search"
            onChange={e => {
              setSearchTerm(e.target.value.toLowerCase());
            }}
          />
        </div>

        {/* <CTAButton
          variant="addCard"
          onClick={() => {
            props.addCard();
          }}
          title="+"
        /> */}

        <div className="flex flex-row w-[100%]">
          {props.categories.map(category => {
            return (
              <CTAButton
                key={category.id}
                title={category.name}
                variant="deckViewCategory"
                onClick={() => {
                  console.log(category.name);
                }}
              />
            );
          })}
        </div>

        <div className="flex flex-row w-[100%]">
          {props.tags.map(tag => {
            return (
              <CTAButton
                key={tag.id}
                title={tag.name}
                variant="deckViewCategory"
                onClick={() => {
                  console.log(tag.name);
                }}
              />
            );
          })}
        </div>

        {/* <div className="flex flex-row pb-10">
          <Text textColor="black" variant="heading2" content="Chapters" />

          <div className="w-full h-0.5 bg-black self-end"></div>
        </div> */}
        <div className="flex flex-row pb-10">
          <Text textColor="black" variant="heading2" content="Cards" />

          <div className="w-full h-0.5 bg-black self-end"></div>
        </div>
        <div className="flex flex-wrap gap-10 my-2 justify-center items-center mb-[30px]">
          <div
            className="w-[200px] h-[300px] rounded-[20px]  cursor-pointer hover:border-4  text-black flex justify-center items-center border-2 border-white"
            onClick={() => props.addCard()}
          >
            <h2 className="text-white text-[30px] flex justify-center items-center">
              +
            </h2>
          </div>

          {filteredCards.map(card => {
            return (
              <Card
                key={card.id}
                card={card}
                variant="deckCard"
                supabase={props.supabase}
                deck={props.deck}
                setDeck={props.setDeck}
                deckChanges={props.deckChanges}
                setDeckChanges={props.setDeckChanges}
                categories={props.categories}
                setCategories={props.setCategories}
                tags={props.tags}
                setTags={props.setTags}
                createTag={props.createTag}
                createCategory={props.createCategory}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
