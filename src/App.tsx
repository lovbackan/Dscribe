import { useEffect, useState } from 'react';
import { CTAButton } from './components/CTAButton/CTAButton';
import { createClient } from '@supabase/supabase-js';
import './App.css';
import Editor from './components/Editor/Editor';
// import Card from './components/Card/Card';
import Hand from './components/Hand/Hand';
import StoriesContainer from './components/StoriesContainer/StoriesContainer';
import Navbar from './components/Navbar/Navbar';
import { EditorState } from 'lexical';
import Deck from './components/Deck/Deck';
import LoginPage from './components/LoginPage/LoginPage';
// import RichTextViewer from './components/RichTextViewer/RichTextViewer';

interface Story {
  id: number;
}

//Supabase setup
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL
  ? import.meta.env.VITE_SUPABASE_URL
  : ' ';
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY
  ? import.meta.env.VITE_SUPABASE_KEY
  : ' ';

const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState('');
  const [deck, setDeck] = useState<Array<any>>([]);
  const [hand, setHand] = useState<Array<any>>([]);
  const [stories, setStories] = useState<Array<any>>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [view, setView] = useState<'menu' | 'editor'>('editor');
  const [menuView, setMenuView] = useState<
    'home' | 'community' | 'shop' | 'settings' | 'signOut'
  >('home');
  const [categories, setCategories] = useState<Array<any>>([]);
  //Incoporate setCategory to remove problem in terminal and vercel but i have changed vercel settings so it should build even if there are errors (for now).
  const [categoryId, setCategory] = useState<number>(0);

  const [editorState, setEditorState] = useState<EditorState>();

  //Temporary for testing. Different editors will have their own selected cards etc. Main editor may have several cards.
  const [selectedCard, setSelectedCard] = useState<Object>();

  useEffect(() => {
    if (signedIn === true) {
      fetchStories();
    }
  }, [signedIn]);

  useEffect(() => {
    fetchDeck();
    fetchCategories();
    setCategory(0);
    setHand([]);
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

  const fetchStories = async () => {
    const { data, error } = await supabase.from('stories').select('*');
    console.log(data);
    if (error) console.log(error);
    else setStories(data);
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

  //Mostly testing database interactions. Works fine but values are hardcoded.
  const addStory = async () => {
    const insertData = {
      user_id: (await supabase.auth.getUser()).data.user?.id,
      name: 'Gundi',
    };
    const { data, error } = await supabase.from('stories').insert(insertData);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      fetchStories();
    }
  };

  //Login Page
  if (!signedIn) {
    return (
      <>
        <LoginPage supabase={supabase} setSignedIn={setSignedIn} />
      </>
    );
  }

  //Editor page
  if (view === 'editor')
    return (
      <>
        <div className="min-h-full">
          <h1>
            Selected Story:
            {selectedStory ? selectedStory.id : 'None'}
          </h1>
          <StoriesContainer
            stories={stories}
            supabase={supabase}
            setStories={setStories}
            setSelectedStory={setSelectedStory}
          ></StoriesContainer>
          <Editor setEditorState={setEditorState} selectedCard={selectedCard} />
          <button className=" bg-red-600" onClick={addCard}>
            Add Card
          </button>
          <button className=" bg-red-600" onClick={fetchDeck}>
            Get Cards
          </button>
          <button className=" bg-red-600" onClick={addStory}>
            Add Story
          </button>
          <button className=" bg-red-600" onClick={addCategory}>
            Add Category
          </button>
          {selectedStory ? (
            <Hand
              {...{
                supabase,
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
            {...{ supabase, setSelectedCard, setDeck, deck, hand, setHand }}
          />
        </>
      </>
    );

  return (
    <>
      <Navbar setView={setMenuView} view={menuView} />
      {menuView === 'home' ? <h1>Home </h1> : <h2>Inte home</h2>}
    </>
  );
}

export default App;
