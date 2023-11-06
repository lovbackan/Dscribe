import Editor from '../Editor/Editor';
import Hand from '../Hand/Hand';
// import StoriesContainer from '../StoriesContainer/StoriesContainer';
// import Deck from '../Deck/Deck';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect, createContext } from 'react';
import { EditorState } from 'lexical';
import { CTAButton } from '../CTAButton/CTAButton';
import { DeckView } from '../DeckView/DeckView';
import Card from '../Card/Card';
import { supabase } from '../../supabase';

interface EditorPageProps {
  supabase: SupabaseClient;
  stories: Array<any>;
  setStories: Function;
  fetchStories: Function;
  selectedStory: Story | null;
  setSelectedStory: Function;
}
interface Story {
  id: number;
}

//Using context so deck can be accessed by Lexical Editor nodes. Sending props to Editor works less than ideal.
export const deckContext = createContext<any[]>([]);

const EditorPage = (props: EditorPageProps) => {
  const [deck, setDeck] = useState<Array<any>>([]);
  const [editorState, setEditorState] = useState<EditorState>();
  const [categories, setCategories] = useState<Array<any>>([]);
  const [categoryId, setCategory] = useState<number>(0);

  //Temporary for testing. Different editors will have their own selected cards etc. Main editor may have several cards.
  const [selectedCard, setSelectedCard] = useState<Object>();
  const [showDeck, setShowDeck] = useState<boolean>(false);

  const toggleDeckView = () => {
    setShowDeck(!showDeck);
  };

  useEffect(() => {
    fetchDeck();
    fetchCategories();
    setCategory(0);
  }, [props.selectedStory]);

  const fetchDeck = async () => {
    const { data, error } = await props.supabase
      .from('cards')
      .select('*')
      .match({ story_id: props.selectedStory ? props.selectedStory.id : 0 });
    console.log(data);
    if (error) console.log(error);
    else setDeck(...[data]);
  };

  const fetchCategories = async () => {
    if (props.selectedStory) {
      const { data, error } = await props.supabase
        .from('categories')
        .select('*')
        .match({ story_id: props.selectedStory.id });
      console.log(data);
      if (error) console.log(error);
      else setCategories(data);
    }
  };
  //Mostly testing database interactions. Works fine but values are hardcoded. Cards should only be allowed to have story_id to stories corresponding to their user_id. Leaving as is for now to make testing easier.
  const addCard = async () => {
    const editorStateJSON = JSON.stringify(editorState);
    const insertData = {
      user_id: (await props.supabase.auth.getUser()).data.user?.id,
      name: 'Gundi',
      story_id: props.selectedStory ? props.selectedStory.id : 0,
      category_id: categories[categoryId].id,
      text: editorStateJSON,
    };

    console.log(editorState);
    const { data, error } = await props.supabase
      .from('cards')
      .insert(insertData)
      .select()
      .single();
    if (error) {
      console.log(error);
    } else {
      const newDeck = deck;
      const newCard = data;
      setDeck([...newDeck, newCard]);
    }
  };

  const addCategory = async () => {
    const insertData = {
      name: 'Bundi',
      story_id: props.selectedStory ? props.selectedStory.id : 0,
      user_id: (await props.supabase.auth.getUser()).data.user?.id,
    };

    const { data, error } = await props.supabase
      .from('categories')
      .insert(insertData);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
    fetchCategories();
  };

  return (
    <deckContext.Provider value={deck}>
      <div className="h-screen w-screen relative overflow-hidden">
        <h1>
          Selected Story:
          {props.selectedStory ? props.selectedStory.id : 'None'}
        </h1>
        {/* <StoriesContainer
          stories={props.stories}
          supabase={props.supabase}
          setStories={props.setStories}
          selectedStory={props.selectedStory}
          setSelectedStory={props.setSelectedStory}
        ></StoriesContainer> */}
        <Editor setEditorState={setEditorState} selectedCard={selectedCard} />
        {deck.map(card => {
          if (card.openCard)
            return (
              <Card
                card={card}
                variant="openCard"
                supabase={supabase}
                deck={deck}
                setDeck={setDeck}
                setSelectedCard={setSelectedCard}
              />
            );
        })}

        <div className="flex flex-col right-0 top-0 absolute w-full justify-evenly">
          <CTAButton
            variant="secondary"
            onClick={() => {
              fetchDeck();
            }}
            title="Get Cards"
          />

          <CTAButton
            variant="secondary"
            onClick={() => {
              addCategory();
            }}
            title="Add category"
          />
        </div>

        <div className="absolute bottom-0 z-10 flex flex-col justify-between gap-5 pb-6 pl-6">
          <CTAButton
            variant="deck"
            onClick={() => {
              addCard();
            }}
            title="+"
          />
          <CTAButton
            title="D"
            variant="deck"
            onClick={() => {
              toggleDeckView();
            }}
          />
        </div>

        {props.selectedStory ? (
          <div className="flex justify-center">
            <Hand
              supabase={props.supabase}
              {...{
                setSelectedCard,
                setDeck,
                deck,
              }}
            />
          </div>
        ) : null}

        <div
          className={`justify-center items-center absolute top-[5%] z-10 ${
            showDeck ? 'flex' : 'hidden'
          }`}
        >
          <DeckView
            showDeckView={showDeck}
            toggleDeckView={toggleDeckView}
            supabase={props.supabase}
            {...{ setSelectedCard, setDeck, deck }}
          />
        </div>
      </div>
    </deckContext.Provider>
  );
};

export default EditorPage;
