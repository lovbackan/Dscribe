// DeckView.tsx

import React from 'react';
import Card from '../Card/Card';
import { useEffect } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { CTAButton } from '../CTAButton/CTAButton';
import { Input } from '../Input/Input';
import { Text } from '../Text/Text';
import { useState } from 'react';
import PopUp from '../PopUp/PopUp';

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
  const [changeCardId, setChangeCardId] = useState<any>(null);

  const [showDeletePopup, setShowDeletePopup] = useState(false);

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

  const deleteCard = async (cardId: number) => {
    const result = await props.supabase
      .from('cards')
      .delete()
      .match({ id: cardId });
    if (result.error) console.log(result.error);
    else {
      const updatedDeck = props.deck;
      const idToRemove = updatedDeck.findIndex(card => card.id === cardId);
      updatedDeck.splice(idToRemove, 1);
      props.setDeck([...updatedDeck]);
    }
  };

  const deleteCategory = async (categoryId: number) => {
    const { error } = await props.supabase
      .from('categories')
      .delete()
      .match({ id: categoryId });

    if (error) {
      alert('Failed to delete. Error: ' + error.message);
      return;
    }

    const newCategories = props.categories;
    const index = props.categories.findIndex(category => {
      if (category.id == categoryId) return true;
      return false;
    });
    newCategories.splice(index, 1);
    props.setCategories([...newCategories]);

    console.log(props.deck);
    const newDeck = props.deck.map(card => {
      if (card.category_id === categoryId) card.category_id = null;
      return card;
    });

    props.setDeck([...newDeck]);
  };

  const deleteTag = async (tagId: number) => {
    const { error } = await props.supabase
      .from('tags')
      .delete()
      .match({ id: tagId });

    if (error) {
      alert('Failed to delete. Error: ' + error.message);
      return;
    }

    const newTags = props.tags;
    const index = props.tags.findIndex(tag => {
      if (tag.id == tagId) return true;
      return false;
    });
    newTags.splice(index, 1);
    props.setTags([...newTags]);

    console.log(props.deck);
    const newDeck = props.deck.map(card => {
      const index = card.tags.findIndex((tag: { id: number }) => {
        if (tag.id === tagId) return true;
        return false;
      });
      if (index === -1) return card;
      card.tags.splice(index, 1);
      return card;
    });

    props.setDeck([...newDeck]);
  };

  if (props.showDeckView === false) return null;
  return (
    <section
      id="deckView"
      className="  bg-gradient-to-b from-[#C7D8FF] to-[#FAFAFA] overflow-y-auto rounded-3xl w-[75vw] h-[85vh]"
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
            autoComplete="off"
            autoFocus={true}
            onChange={e => {
              setSearchTerm(e.target.value.toLowerCase());
            }}
          />
        </div>
        <div className="flex flex-row w-[100%] h-auto">
          {props.categories.map(category => {
            return (
              <CTAButton
                key={category.id}
                title={category.name}
                variant="deckViewCategory"
                color={category.color_id}
                onClick={() => {
                  //Should be a button on the tag that opens a "Are you sure window?"
                  deleteCategory(category.id);
                }}
              />
            );
          })}
        </div>

        <div className="flex flex-row w-[100%] h-auto flex-wrap ">
          {props.tags.map(tag => {
            return (
              <CTAButton
                key={tag.id}
                title={tag.name}
                variant="deckViewCategory"
                color={tag.color_id}
                onClick={() => {
                  //Should be a button on the tag that opens a "Are you sure window?"
                  deleteTag(tag.id);
                }}
              />
            );
          })}
        </div>
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
                toggleDeletePopup={() => {
                  setShowDeletePopup(true);
                  setChangeCardId(card);
                }}
              />
            );
          })}
        </div>
      </div>
      {showDeletePopup && (
        <PopUp
          variant="deleteStory"
          changeCardId={changeCardId.name}
          action={() => {
            deleteCard(changeCardId.id);
            // deleteStory(changeCardId.id);
            setShowDeletePopup(false);
          }}
          cancel={() => {
            setShowDeletePopup(false);
          }}
        />
      )}
    </section>
  );
};
