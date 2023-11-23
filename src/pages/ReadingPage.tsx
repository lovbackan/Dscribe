import { supabase } from '../supabase';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ACCEPTED_ROUTES } from '../routes/routes';
import RichTextViewer from '../components/RichTextViewer/RichTextViewer';
import Logo from '../components/Logo/Logo';
import Card from '../components/Card/Card';
import StoryCard from '../components/StoryCard/StoryCard';

import { deckContext, setDeckContext } from './EditorPage';

type CardPositions = {
  [key: string]: { x: number; y: number };
};

const ReadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedStory = location.state.selectedStory;
  const [cardPositions, setCardPositions] = useState<CardPositions>({});
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [deck, setDeck] = useState<any[]>([]);
  const [story, setStory] = useState<{
    id: string;
    name: string;
    text: string;
  } | null>();
  const [categories, setCategories] = useState<any[]>([]);
  const [dragOffset, setDragOffset] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [shouldFollowCursor, setShouldFollowCursor] = useState<string | null>(
    null,
  );

  useEffect(() => {
    console.log(deck);
  }, [deck]);

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

  useEffect(() => {
    if (selectedStory === null) {
      navigate(ACCEPTED_ROUTES.HOME);
    }
    fetchDeck();
    fetchCategories();
    fetchStory();
  }, [selectedStory]);

  const fetchDeck = async () => {
    const { data, error } = await supabase
      .from('cards')
      .select('*, tags (*), categories(*)')
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

  return (
    <>
      <setDeckContext.Provider value={setDeck}>
        <deckContext.Provider value={deck}>
          <div
            className={`h-screen w-screen relative flex justify-center overflow-hidden bg-[#0F172A]`}
          >
            {/* <div className="absolute flex justify-center items-center w-screen">
              <Text
                variant="heading1Bold"
                textColor="white"
                content={story ? story.name : ''}
              />
            </div> */}
            <div
              className="absolute right-0 pointer-events-none mr-7"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <StoryCard story={selectedStory} author="always" />
            </div>
            <Logo variant="editor" />
            <div
              className={`absolute w-[60%] h-[100%] mt-12 rounded-tl-lg rounded-tr-lg bg-white`}
            >
              {story ? (
                <RichTextViewer editorState={story.text} />
              ) : // <Editor
              //   deck={deck}
              //   setDeck={setDeck}
              //   story={story}
              //   setStory={setStory}
              // />
              null}
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
                      variant="openCardRead"
                      supabase={supabase}
                      deck={deck}
                      setDeck={setDeck}
                      categories={categories}
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
          </div>
        </deckContext.Provider>
      </setDeckContext.Provider>
    </>
  );
};
export default ReadingPage;
