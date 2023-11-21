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
  const [toBeDeleted, setToBeDeleted] = useState<any>(null);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteType, setDeleteType] = useState<
    'card' | 'category' | 'tag' | null
  >(null);

  const [filterTags, setFilterTags] = useState<any[]>([]);
  const [filterCategories, setFilterCategories] = useState<any[]>([]);
  const [columns, setColumns] = useState<any>(4);

  //Listen to window event instead.

  const handleResize = () => {
    //Deckview 75% 160px padding 200px card width + 5px gap
    setColumns(Math.floor((window.innerWidth * 0.75 - 160) / 210));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, true);

    return window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let newFilteredCards = allCards;
    if (searchTerm !== '') {
      newFilteredCards = allCards.filter(
        card =>
          card && card.name && card.name.toLowerCase().includes(searchTerm),
      );
    }

    if (filterCategories.length > 0) {
      newFilteredCards = newFilteredCards.filter(card => {
        let hasCategory = false;
        filterCategories.forEach(categoryId => {
          if (card.category_id === categoryId) {
            hasCategory = true;
            return;
          }
        });

        return hasCategory;
      });
    }

    if (filterTags.length > 0) {
      newFilteredCards = newFilteredCards.filter(card => {
        let hasTags = true;
        const tagIds: any[] = card.tags.map((tag: { id: number }) => {
          return tag.id;
        });

        filterTags.forEach(tag => {
          if (!tagIds.includes(tag)) {
            hasTags = false;
            return;
          }
        });

        return hasTags;
      });
    }

    setFilteredCards(newFilteredCards);
  }, [allCards, searchTerm, filterTags, filterCategories]);

  useEffect(() => {
    setFilteredCards(props.deck);
  }, [props.deck]);

  useEffect(() => {
    setAllCards(props.deck);
  }, [props.deck]);

  const toggleFilterCategory = (id: number) => {
    const newFilterCategories = filterCategories;
    const index = filterCategories.indexOf(id);
    if (index === -1) newFilterCategories.push(id);
    else newFilterCategories.splice(index, 1);
    setFilterCategories([...newFilterCategories]);
  };

  const toggleFilterTag = (id: number) => {
    const newFilterTags = filterTags;
    const index = filterTags.indexOf(id);
    if (index === -1) newFilterTags.push(id);
    else newFilterTags.splice(index, 1);
    setFilterTags([...newFilterTags]);
  };

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

    if (filterCategories.includes(categoryId)) toggleFilterCategory(categoryId);
    const newCategories = props.categories;
    const index = props.categories.findIndex(category => {
      if (category.id == categoryId) return true;
      return false;
    });
    newCategories.splice(index, 1);
    props.setCategories([...newCategories]);

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

    if (filterTags.includes(tagId)) toggleFilterTag(tagId);
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
        <div className="fixed mr-[5px] mt-[5px]">
          <CTAButton
            title=""
            variant="closeBig"
            onClick={() => {
              console.log('close deck view');
              props.toggleDeckView();
            }}
          />

          {/* <CTAButton
            title="X"
            variant="minimize/close"
            onClick={() => {
              console.log('close deck view');
              props.toggleDeckView();
            }}
          /> */}
        </div>
      </div>
      <div className="px-20">
        <div id="title" className="mt-4 ">
          <Text variant="heading2" content="Deck View" textColor="black" />
        </div>
        {/* map over deck and display cards */}

        <div className="flex flex-row mt-[12px]">
          <div className="pr-2">
            <Text variant="heading3" content="Filter" textColor="black" />
          </div>
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
        <div className="flex flex-row w-[100%] h-auto mt-[12px] gap-2 items-center">
          <Text variant="heading3" content="Categories" textColor="black" />
          {props.categories.map(category => {
            return (
              <CTAButton
                key={category.id}
                title={category.name}
                variant={
                  filterCategories.includes(category.id)
                    ? 'deckViewCategoryFiltered'
                    : 'deckViewCategory'
                }
                color={category.color_id}
                onClick={() => {
                  toggleFilterCategory(category.id);
                }}
                remove={() => {
                  setShowDeletePopup(true);
                  setToBeDeleted(category);
                  setDeleteType('category');
                }}
              />
            );
          })}
        </div>

        <div className="flex flex-row w-[100%] h-auto flex-wrap mt-[12px] gap-1  items-center ">
          <Text variant="heading3" content="Tags" textColor="black" />
          {props.tags.map(tag => {
            return (
              <CTAButton
                key={tag.id}
                title={tag.name}
                variant={
                  filterTags.includes(tag.id)
                    ? 'deckViewCategoryFiltered'
                    : 'deckViewCategory'
                }
                color={tag.color_id}
                onClick={() => {
                  toggleFilterTag(tag.id);
                }}
                remove={() => {
                  setShowDeletePopup(true);
                  setToBeDeleted(tag);
                  setDeleteType('tag');
                }}
              />
            );
          })}
        </div>
        <div className="flex flex-row pb-10 mt-[12px]">
          <Text textColor="black" variant="heading2" content="Cards" />

          <div className="w-full h-0.5 bg-black self-end mb-[6px]"></div>
        </div>
        {/* Fix grid-cols to be dynamically size */}
        <div
          className={`grid gap-4 my-2 items-center mb-[30px] `}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          <div
            className="w-[200px] h-[300px] rounded-[20px] shadow-right-bottom cursor-pointer hover:border-4  bg-black opacity-50 flex justify-center items-center border-2 border-white"
            onClick={() => props.addCard()}
          >
            <Text variant="heading2" content="+" textColor="white" />
          </div>
          {/* <div
          className={`grid gap-4 my-2 items-center mb-[30px] justify-between`}
          style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}
        >
          <div
            className="w-[200px] h-[300px] rounded-[20px] shadow-right-bottom cursor-pointer hover:border-4  bg-black opacity-50 flex justify-center items-center border-2 border-white "
            onClick={() => props.addCard()}
          >
            <Text variant="heading2" content="+" textColor="white" />
          </div> */}

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
                  setToBeDeleted(card);
                  setDeleteType('card');
                }}
              />
            );
          })}
        </div>
      </div>
      {showDeletePopup && (
        <PopUp
          variant="deleteStory"
          changeCardId={toBeDeleted.name}
          action={() => {
            if (deleteType === 'card') deleteCard(toBeDeleted.id);
            if (deleteType === 'category') deleteCategory(toBeDeleted.id);
            if (deleteType === 'tag') deleteTag(toBeDeleted.id);
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
