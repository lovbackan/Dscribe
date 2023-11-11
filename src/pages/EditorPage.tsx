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
import Logo from '../components/Logo/Logo';
import { Text } from '../components/Text/Text';

export const deckContext = createContext<any[]>([]);
type CardPositions = {
  [key: string]: { x: number; y: number };
};

const EditorPage = () => {
  //cursor position
  const [cardPositions, setCardPositions] = useState<CardPositions>({});

  const [shouldFollowCursor, setShouldFollowCursor] = useState<string | null>(
    null,
  );
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null,
  );

  //now the card will follow the cursor, this creates an ugly jump when you move the card since it will position the div at the curser
  useEffect(() => {
    const handleMouseMove = e => {
      if (shouldFollowCursor && dragOffset) {
        setCardPositions(prevPositions => ({
          ...prevPositions,
          [shouldFollowCursor]: {
            x: e.clientX - dragOffset.x,
            y: e.clientY - dragOffset.y,
          },
        }));
      }
    };

    const handleMouseUp = () => {
      setShouldFollowCursor(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [shouldFollowCursor]);
  const navigate = useNavigate();

  // make z-index state for openCards and on click increase its value so it has the highest z-index
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [deck, setDeck] = useState<any[]>([]);
  const [deckChanges, setDeckChanges] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);

  const location = useLocation();
  const selectedStory = location.state.selectedStory;
  const [story, setStory] = useState<any>(); //Should be type story | null
  const [storyChanges, setStoryChanges] = useState<{ text?: string }>({});
  const storyChangesRef = useRef(storyChanges);
  storyChangesRef.current = storyChanges;

  const [editorState, setEditorState] = useState<EditorState>();
  const [showDeck, setShowDeck] = useState<boolean>(false);

  const [saveTimer, setSaveTimer] = useState(0);
  const saveTimerRef = useRef(saveTimer);
  saveTimerRef.current = saveTimer;
  const deckChangesRef = useRef(deckChanges);
  deckChangesRef.current = deckChanges;

  const [saveTimerIsRunning, setSaveTimerIsRunning] = useState(false);

  const [onceState, setOnceState] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(saveCountdown, 500);
    return () => clearTimeout(timeout); //Gets around this running twice due to strict mode. Should probably be a state thats updated with the current timeout instead.
  }, []);

  const saveCountdown = async () => {
    if (saveTimerRef.current >= 0) {
      const newTime = saveTimerRef.current - 100;
      setSaveTimer(newTime);
      if (newTime <= 0) {
        //Saving happens here. Needs error handling.
        const userId = (await supabase.auth.getUser()).data.user?.id;
        const deckErrors = [];
        deckChangesRef.current.forEach(async card => {
          if (card.tags)
            card.tags.forEach(async (tag: any) => {
              const { data, error } = await supabase.from('cards_tags').insert({
                tag_id: tag.id,
                card_id: card.id,
                user_id: userId,
              });
              if (error) {
                console.log(error);
                deckErrors.push(error);
              }
            });

          const updatedValues: { text?: string; name?: string } = {};

          if (card.text) updatedValues.text = card.text;
          if (card.name) updatedValues.name = card.name;

          const { data, error } = await supabase
            .from('cards')
            .update(updatedValues)
            .eq('id', card.id);

          if (error) {
            console.log(error);
            deckErrors.push(error);
          }
        });
        if (deckErrors.length === 0) setDeckChanges([]);
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
    fetchTags();
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
      .select('*, tags (*)')
      .match({ story_id: selectedStory ? selectedStory.id : 0 });
    console.log(data);
    if (error) console.log(error);
    else setDeck(...[data]);
    console.log(data);
  };

  const fetchCategories = async () => {
    if (selectedStory) {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('story_id', selectedStory.id);
      if (error) console.log(error);
      else setCategories([...data]);
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
  };

  const fetchTags = async () => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('story_id', selectedStory.id);
    if (error) console.log(error);
    else setTags(data);
    console.log('tags:', data);
    console.log(selectedStory.id);
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
      newCard.tags = [];
      setDeck([...newDeck, newCard]);
    }
  };

  const createCategory = async () => {
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

  const createTag = async () => {
    const insertData = {
      user_id: (await supabase.auth.getUser()).data.user?.id,
      name: 'New Tag',
      story_id: selectedStory.id,
    };
    const { data, error } = await supabase
      .from('tags')
      .insert(insertData)
      .select()
      .single();
    if (error) {
      console.log(error);
    } else {
      const newTags = tags;
      const newTag = data;
      setTags([...newTags, newTag]);
    }
  };

  return (
    <deckContext.Provider value={deck}>
      <div className="h-screen w-screen relative overflow-hidden md:bg-slate-400 lg:bg-slate-700 ">
        <div className="absolute flex justify-center items-center w-screen">
          <Text
            variant="heading1Bold"
            textColor="white"
            content={story ? story.name : ''}
          />
        </div>

        <Logo variant="editor" />

        <div className="absolute left-1/4 w-[60%] h-[90%] mt-12">
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
          <div className="absolute h-[20%] w-[100%] mt-12 bg-white"></div>
        </div>
        {deck.map(card => {
          if (card.openCard)
            return (
              <div
                id={card.id + 'openCard'}
                className="inline-block absolute "
                style={{
                  left: cardPositions[card.id]?.x || 0,
                  top: cardPositions[card.id]?.y || 0,
                  zIndex: activeCard === card.id ? 11 : 10,
                }}
                onMouseDown={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setDragOffset({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                  setShouldFollowCursor(card.id);
                  setActiveCard(card.id);
                }}
              >
                <Card
                  key={card.id}
                  card={card}
                  variant="openCard"
                  supabase={supabase}
                  deck={deck}
                  setDeck={setDeck}
                  setEditorState={setEditorState}
                  deckChanges={deckChanges}
                  setDeckChanges={setDeckChanges}
                  categories={categories}
                  setCategories={setCategories}
                />
              </div>
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
            title=" "
            variant="viewDeck"
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

        <div className="w-screen h-screen flex justify-center items-center">
          <div
            className={`justify-center items-center absolute z-10 ${
              showDeck ? 'flex' : 'hidden'
            }`}
          >
            <DeckView
              addCard={addCard}
              showDeckView={showDeck}
              toggleDeckView={toggleDeckView}
              supabase={supabase}
              {...{
                setDeck,
                deck,
                setDeckChanges,
                deckChanges,
                categories,
                setCategories,
                tags,
                setTags,
                createTag,
              }}
            />
          </div>
        </div>
      </div>
    </deckContext.Provider>
  );
};

export default EditorPage;
