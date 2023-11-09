import { useLocation } from 'react-router-dom';
import { supabase } from '../supabase';
import { useState, useEffect, createContext, useRef } from 'react';
import { EditorState } from 'lexical';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { DeckView } from '../components/DeckView/DeckView';
import Editor from '../components/Editor/Editor';
import Hand from '../components/Hand/Hand';
import Card from '../components/Card/Card';
import { useNavigate } from 'react-router-dom';
import { ACCEPTED_ROUTES } from '../routes/routes';

export const deckContext = createContext<any[]>([]);

const EditorPage = () => {
  const navigate = useNavigate();

  const [deck, setDeck] = useState<Array<any>>([]);
  const [deckChanges, setDeckChanges] = useState<Array<any>>([]);
  const location = useLocation();
  const selectedStory = location.state.selectedStory;
  const [story, setStory] = useState<any>(); //Should be type story | null
  const [storyChanges, setStoryChanges] = useState<{ text?: string }>({});
  const storyChangesRef = useRef(storyChanges);
  storyChangesRef.current = storyChanges;

  const [editorState, setEditorState] = useState<EditorState>();
  const [categories, setCategories] = useState<Array<any>>([]);
  const [showDeck, setShowDeck] = useState<boolean>(false);

  const [saveTimer, setSaveTimer] = useState(0);
  const saveTimerRef = useRef(saveTimer);
  saveTimerRef.current = saveTimer;
  const deckChangesRef = useRef(deckChanges);
  deckChangesRef.current = deckChanges;

  const [saveTimerIsRunning, setSaveTimerIsRunning] = useState(false);

  useEffect(() => {
    //Several instances of this is running at the same time, due to React strict mode.
    if (!saveTimerIsRunning) {
      setSaveTimerIsRunning(false);
      saveCountdown();
    }
  }, []);

  const saveCountdown = () => {
    if (saveTimerRef.current >= 0) {
      const newTime = saveTimerRef.current - 100;
      setSaveTimer(newTime);
      if (newTime <= 0) {
        //Saving happens here. Needs error handling.
        deckChangesRef.current.forEach(async card => {
          console.log(card);
          const updatedValues: { text?: string; name?: string } = {};

          if (card.text) updatedValues.text = card.text;
          if (card.name) updatedValues.name = card.name;

          const { data, error } = await supabase
            .from('cards')
            .update(updatedValues)
            .eq('id', card.id);
          if (!error) {
            console.log('Emptying changes');
            setDeckChanges([]);
          }
        });
        if (storyChangesRef.current.text) {
          supabase
            .from('stories')
            .update({ text: storyChangesRef.current.text })
            .eq('id', selectedStory.id)
            .then(result => {
              if (!result.error) setStoryChanges({});
              console.log(result);
            });
        }
      }
    }
    setTimeout(saveCountdown, 100);
  };

  const toggleDeckView = () => {
    setShowDeck(!showDeck);
  };

  useEffect(() => {
    if (selectedStory === null) {
      navigate(ACCEPTED_ROUTES.HOME);
    }
    fetchDeck();
    fetchCategories();
    fetchStory();
  }, [selectedStory]);

  useEffect(() => {
    //Change this magic number?
    if (deckChanges.length === 0 && Object.keys(storyChanges).length === 0)
      return;
    setSaveTimer(500);
  }, [deckChanges, storyChanges]);

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
      if (error) console.log(error);
      else setCategories(data);
    }
  };

  const fetchStory = async () => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', selectedStory.id)
      .single();
    if (error) console.log(error);
    else setStory(data);
    console.log('story:', data);
  };

  const addCard = async () => {
    // const editorStateJSON = JSON.stringify(editorState);
    const insertData = {
      user_id: (await supabase.auth.getUser()).data.user?.id,
      name: 'New Card',
      story_id: selectedStory ? selectedStory.id : 0,
      // text: editorStateJSON,
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
        <h1>{story ? story.name : ''}</h1>

        <div className="absolute left-1/4 w-1/2 h-3/4">
          {story ? (
            <Editor
              setEditorState={setEditorState}
              deck={deck}
              setDeck={setDeck}
              story={story}
              setStory={setStory}
              setStoryChanges={setStoryChanges}
            />
          ) : null}
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
                setEditorState={setEditorState}
                deckChanges={deckChanges}
                setDeckChanges={setDeckChanges}
              />
            );
        })}
        {/* <div className="flex flex-col right-0 top-0 absolute w-full justify-evenly">
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
        </div> */}

        <div className="absolute bottom-0 z-10 flex flex-col justify-between gap-5 pb-6 pl-6">
          {/* <CTAButton
            variant="deck"
            onClick={() => {
              addCard();
            }}
            title="+"
          /> */}
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
            addCard={addCard}
            showDeckView={showDeck}
            toggleDeckView={toggleDeckView}
            supabase={supabase}
            {...{ setDeck, deck }}
          />
        </div>
      </div>
    </deckContext.Provider>
  );
};

export default EditorPage;
