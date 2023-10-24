import Editor from '../Editor/Editor';
import Hand from '../Hand/Hand';
import StoriesContainer from '../StoriesContainer/StoriesContainer';
import Deck from '../Deck/Deck';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { EditorState } from 'lexical';
import { useEffect } from 'react';

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

const EditorPage = (props: EditorPageProps) => {
  const [deck, setDeck] = useState<Array<any>>([]);
  const [hand, setHand] = useState<Array<any>>([]);
  const [editorState, setEditorState] = useState<EditorState>();
  const [categories, setCategories] = useState<Array<any>>([]);
  const [categoryId, setCategory] = useState<number>(0);

  //Temporary for testing. Different editors will have their own selected cards etc. Main editor may have several cards.
  const [selectedCard, setSelectedCard] = useState<Object>();

  useEffect(() => {
    fetchDeck();
    fetchCategories();
    setCategory(0);
    setHand([]);
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
    <>
      <div className="min-h-full">
        <h1>
          Selected Story:
          {props.selectedStory ? props.selectedStory.id : 'None'}
        </h1>
        <StoriesContainer
          stories={props.stories}
          supabase={props.supabase}
          setStories={props.setStories}
          selectedStory={props.selectedStory}
          setSelectedStory={props.setSelectedStory}
        ></StoriesContainer>
        <Editor setEditorState={setEditorState} selectedCard={selectedCard} />
        <button className=" bg-red-600" onClick={addCard}>
          Add Card
        </button>
        <button className=" bg-red-600" onClick={fetchDeck}>
          Get Cards
        </button>
        <button className=" bg-red-600" onClick={addCategory}>
          Add Category
        </button>
        {props.selectedStory ? (
          <Hand
            supabase={props.supabase}
            {...{
              setSelectedCard,
              setDeck,
              deck,
              hand,
              setHand,
            }}
          />
        ) : null}
      </div>
      <>
        <h1>Say hello to my little deck.</h1>
        <h2>hej</h2>
        <Deck
          supabase={props.supabase}
          {...{ setSelectedCard, setDeck, deck, hand, setHand }}
        />
      </>
    </>
  );
};

export default EditorPage;
