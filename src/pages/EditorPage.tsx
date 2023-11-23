import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { useState, useEffect, createContext, useRef } from 'react';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { DeckView } from '../components/DeckView/DeckView';
import Editor from '../components/Editor/Editor';
import Hand from '../components/Hand/Hand';
import Card from '../components/Card/Card';
import { ACCEPTED_ROUTES } from '../routes/routes';
import Logo from '../components/Logo/Logo';
import StoryCard from '../components/StoryCard/StoryCard';

type CardPositions = {
  [key: string]: { x: number; y: number };
};

export const deckContext = createContext<any[]>([]);
export const setDeckContext = createContext<Function>(() => {});

const EditorPage = () => {
  //Code for dragging cards
  const [cardPositions, setCardPositions] = useState<CardPositions>({});

  const [shouldFollowCursor, setShouldFollowCursor] = useState<string | null>(
    null,
  );
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null,
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
  // make z-index state for openCards and on click increase its value so it has the highest z-index
  const [activeCard, setActiveCard] = useState<string | null>(null);
  // const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [deck, setDeck] = useState<any[]>([]);
  const [deckChanges, setDeckChanges] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);

  const location = useLocation();
  const selectedStory = location.state.selectedStory;
  const [story, setStory] = useState<{
    id: string;
    name: string;
    text: string;
  } | null>();
  const [storyChanges, setStoryChanges] = useState<{ text?: string }>({});
  const storyChangesRef = useRef(storyChanges);
  storyChangesRef.current = storyChanges;

  const [showDeck, setShowDeck] = useState<boolean>(false);

  const [saveTimer, setSaveTimer] = useState(0);
  const saveTimerRef = useRef(saveTimer);
  saveTimerRef.current = saveTimer;
  const deckChangesRef = useRef(deckChanges);
  deckChangesRef.current = deckChanges;
  const [saveAnimation, setSaveAnimation] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (saveAnimation === true) setTimeout(() => setSaveAnimation(false), 500);
  }, [saveAnimation]);

  useEffect(() => {
    const timeout = setTimeout(saveCountdown, 500);
    return () => clearTimeout(timeout); //Gets around this running twice due to strict mode. Should probably be a state thats updated with the current timeout instead.
  }, []);

  const saveCountdown = async () => {
    if (saveTimerRef.current >= 0) {
      const newTime = saveTimerRef.current - 100;
      let changes = false;
      setSaveTimer(newTime);
      if (newTime <= 0) {
        //Saving happens here. Needs error handling.
        const userId = (await supabase.auth.getUser()).data.user?.id;
        const deckErrors = [];
        deckChangesRef.current.forEach(async card => {
          if (card.tags)
            card.tags.forEach(async (tag: any) => {
              const { error } = await supabase.from('cards_tags').insert({
                tag_id: tag.id,
                card_id: card.id,
                user_id: userId,
              });
              if (error) {
                console.log(error);
                deckErrors.push(error);
              }
            });

          const updatedValues: {
            text?: string;
            name?: string;
            category_id?: number;
          } = {};

          if (card.text) updatedValues.text = card.text;
          if (card.name) updatedValues.name = card.name;
          if (card.category_id) updatedValues.category_id = card.category_id;

          const { error } = await supabase
            .from('cards')
            .update(updatedValues)
            .eq('id', card.id);

          if (error) {
            console.log(error);
            deckErrors.push(error);
          }
        });
        if (deckErrors.length === 0 && deckChanges.length > 0) {
          setDeckChanges([]);
          changes = true;
        }

        if (storyChangesRef.current.text) {
          await supabase
            .from('stories')
            .update({ text: storyChangesRef.current.text })
            .eq('id', selectedStory.id)
            .then(result => {
              if (!result.error) {
                setStoryChanges({});
                changes = true;
              }
            });
        }
        if (changes) setSaveAnimation(true);
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
      .select('*, tags (*), categories(*)')
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
    const insertData = {
      user_id: (await supabase.auth.getUser()).data.user?.id,
      name: 'New Card',
      story_id: selectedStory ? selectedStory.id : 0,
    };

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
      setDeck([newCard, ...newDeck]);
    }
  };

  const createCategory = async (name: string) => {
    const insertData = {
      name: name,
      story_id: selectedStory ? selectedStory.id : 0,
      user_id: (await supabase.auth.getUser()).data.user?.id,
      color_id: Math.floor(Math.random() * 8),
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

  const createTag = async (name: string) => {
    const insertData = {
      user_id: (await supabase.auth.getUser()).data.user?.id,
      name: name,
      story_id: selectedStory.id,
      color_id: Math.floor(Math.random() * 8),
    };
    const { error } = await supabase
      .from('tags')
      .insert(insertData)
      .select()
      .single();
    if (error) {
      console.log(error);
    } else {
      fetchTags();
      // const newTags = tags;
      // const newTag = data;
      // setTags([...newTags, newTag])
    }
  };

  console.log(selectedStory);
  console.log(story);

  return (
    <setDeckContext.Provider value={setDeck}>
      <deckContext.Provider value={deck}>
        {/* showdeck ändrar inte bakgrund nu*/}
        <div
          className={`h-screen w-screen relative flex justify-center overflow-hidden ${
            darkMode ? 'bg-[#0F172A]' : 'bg-[#5179D9]'
          }  ${showDeck ? 'bg-[#0C101A] ' : 'bg-[#0F172A]'} `}
        >
          <div
            className="w-[200px] h-[300px] right-0 absolute top-0 pointer-events-none mr-7 mt-7"
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <StoryCard
              story={selectedStory}
              author="always"
              setSelectedStory={() => {}}
            />
          </div>
          {/* <section
            className={`h-[300px] w-[200px] rounded-[10px] border-2 justify-center items-center absolute right-0 mr-7 mt-7`}
          >
            {selectedStory.image_path && (
              <img
                src={`https://shgbqnaodutxthloqmkx.supabase.co/storage/v1/object/public/images/${selectedStory.image_path} `}
                alt=""
                className="absolute w-full h-full rounded-[8px] object-fill"
                draggable="false"
              />
            )}
            <div className=" h-auto absolute w-[150px] ml-[24px] mt-[42px] bg-black bg-opacity-60 rounded-lg p-3">
              <Text
                content={story ? story.name : ''}
                textColor="white"
                variant="cardTitle"
              />
            </div>

            <div className="absolute bottom-0 flex justify-center items-center w-full rounded-[8px] bg-black bg-opacity-40 h-8 ">
              <Text
                content={`Author: ${selectedStory.author}`}
                textColor="white"
                variant="pPrimary"
              />
            </div>
          </section> */}

          <Logo variant="editor" />

          <div
            className={`absolute w-[60%] h-[100%] pb-12 mt-12 rounded-tl-lg rounded-tr-lg bg-white ${
              showDeck ? 'opacity-50  ' : 'opacity-100'
            }`}
          >
            {story ? (
              <Editor
                deck={deck}
                setDeck={setDeck}
                story={story}
                setStory={setStory}
                setStoryChanges={setStoryChanges}
                deckViewOpen={showDeck}
              />
            ) : null}
          </div>
          {deck.map(card => {
            if (card.openCard)
              return (
                <div
                  id={card.id + 'openCard'}
                  className="inline-block absolute  "
                  style={{
                    left: cardPositions[card.id]?.x || 0,
                    top: cardPositions[card.id]?.y || 0,
                    zIndex: activeCard === card.id ? 11 : 10,
                  }}
                >
                  <Card
                    key={card.id}
                    card={card}
                    tags={tags}
                    createTag={createTag}
                    variant="openCard"
                    supabase={supabase}
                    deck={deck}
                    setDeck={setDeck}
                    deckChanges={deckChanges}
                    setDeckChanges={setDeckChanges}
                    categories={categories}
                    setCategories={setCategories}
                    handleMouseDown={e => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setDragOffset({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                      });
                      setShouldFollowCursor(card.id);
                      setActiveCard(card.id);
                    }}
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
          <div
            id="darkModeToggle"
            className={`absolute bottom-0 right-0 w-[80px] h-[40px] mr-7 mb-7 border rounded-[20px] cursor-pointer flex items-center px-[2px] ${
              darkMode
                ? 'justify-start border-white bg-black '
                : 'justify-end bg-white border-black'
            }`}
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            <div
              className={`rounded-full w-[34px] h-[34px] cursor-pointer ${
                darkMode ? 'bg-white' : 'bg-black'
              }`}
            ></div>
          </div>

          <div className="absolute bottom-0 left-0 z-10 flex flex-col justify-between gap-5 pb-6 pl-6">
            {/* <CTAButton
            variant="deck"
            onClick={() => {
              addCard();
            }}
            title="+"
          /> */}
            <CTAButton
              title=""
              variant="viewDeck"
              onClick={() => {
                toggleDeckView();
              }}
            />
          </div>

          {selectedStory ? (
            <Hand
              supabase={supabase}
              {...{
                setDeck,
                deck,
                categories,
              }}
            />
          ) : null}

          <div className=" h-screen w-screen flex justify-center items-center">
            <div
              className={`justify-center items-center absolute z-20 ${
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
                  createCategory,
                  setSaveAnimation,
                }}
              />
            </div>
          </div>

          <div
            className={` saveSymbol ${saveAnimation ? 'saveAnimation' : ''}`}
          ></div>
        </div>
      </deckContext.Provider>
    </setDeckContext.Provider>
  );
};

export default EditorPage;
