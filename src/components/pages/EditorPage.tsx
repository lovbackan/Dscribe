import { useLocation } from 'react-router-dom';
import { supabase } from '../../supabase';
import { useState, useEffect, createContext } from 'react';
import { EditorState } from 'lexical';
import { CTAButton } from '../CTAButton/CTAButton';
import { DeckView } from '../DeckView/DeckView';
import Editor from '../Editor/Editor';
import Hand from '../Hand/Hand';
import Card from '../Card/Card';
import { useNavigate } from 'react-router-dom';
import { ACCEPTED_ROUTES } from '../../routes/routes';

export const deckContext = createContext<any[]>([]);

const EditorPage = () => {
  const navigate = useNavigate();

  const [deck, setDeck] = useState<Array<any>>([]);
  const location = useLocation();
  const selectedStory = location.state.selectedStory;

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
    if (selectedStory === null) {
      navigate(ACCEPTED_ROUTES.HOME);
    }
    fetchDeck();
    fetchCategories();
    setCategory(0);
  }, [selectedStory]);

  const fetchDeck = async () => {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .match({ story_id: selectedStory ? selectedStory.id : 0 });
    console.log(data);
    if (error) console.log(error);
    else setDeck(...[data]);
  };

  const fetchCategories = async () => {
    if (selectedStory) {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .match({ story_id: selectedStory.id });
      console.log(data);
      if (error) console.log(error);
      else setCategories(data);
    }
  };
  //Mostly testing database interactions. Works fine but values are hardcoded. Cards should only be allowed to have story_id to stories corresponding to their user_id. Leaving as is for now to make testing easier.
  const addCard = async () => {
    const editorStateJSON = JSON.stringify(editorState);
    const insertData = {
      user_id: (await supabase.auth.getUser()).data.user?.id,
      name: 'Gundi',
      story_id: selectedStory ? selectedStory.id : 0,
      category_id: categories[categoryId].id,
      text: editorStateJSON,
    };

    console.log(editorState);
    const { data, error } = await supabase
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
      story_id: selectedStory ? selectedStory.id : 0,
      user_id: (await supabase.auth.getUser()).data.user?.id,
    };

    const { data, error } = await supabase
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
          {selectedStory ? selectedStory.id : 'None'}
        </h1>
        {/* <StoriesContainer
          stories={props.stories}
          supabase={props.supabase}
          setStories={props.setStories}
          selectedStory={props.selectedStory}
          setSelectedStory={props.setSelectedStory}
        ></StoriesContainer> */}
        <div className="absolute left-1/4 w-1/2 h-3/4">
          <Editor
            setEditorState={setEditorState}
            selectedCard={selectedCard}
            deck={deck}
          />
        </div>
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
                setEditorState={setEditorState}
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

        {selectedStory ? (
          <div className="flex justify-center">
            <Hand
              supabase={supabase}
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
            supabase={supabase}
            {...{ setSelectedCard, setDeck, deck }}
          />
        </div>
      </div>
    </deckContext.Provider>
  );
};

export default EditorPage;
