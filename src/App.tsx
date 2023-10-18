import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';
import Editor from './components/EditorTemporarilyRenamed/Editor';
import Card from './components/Card/Card';
import StoriesContainer from './components/StoriesContainer/StoriesContainer';
import Navbar from './components/Navbar/Navbar';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const [deck, setDeck] = useState<Array<any>>([]);
  const [stories, setStories] = useState<Array<any>>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [view, setView] = useState<
    'home' | 'community' | 'shop' | 'settings' | 'signOut'
  >('home');

  useEffect(() => {
    fetchDeck();
  }, [selectedStory]);

  const fetchDeck = async () => {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .match({ story_id: selectedStory ? selectedStory.id : 0 });
    console.log(data);
    if (error) console.log(error);
    else setDeck(data);
  };

  const fetchStories = async () => {
    const { data, error } = await supabase.from('stories').select('*');
    console.log(data);
    if (error) console.log(error);
    else setStories(data);
  };
  //Mostly testing database interactions. Works fine but values are hardcoded. Cards should only be allowed to have story_id to stories corresponding to their user_id. Leaving as is for now to make testing easier.
  const addCard = async () => {
    const insertData = {
      user_id: (await supabase.auth.getUser()).data.user?.id,
      name: 'Gundi',
      story_id: selectedStory ? selectedStory.id : 0,
    };
    const { data, error } = await supabase.from('cards').insert(insertData);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      fetchDeck();
    }
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

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!error) setSignedIn(true);
    else console.log(error);
    console.log(data);
    console.log(error);
    if (error) setError(error.message);
    if (!error) {
      fetchDeck();
      fetchStories();
    }
  };
  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: user,
        },
      },
    });
    console.log(data);
    console.log(error);
    if (error) setError(error.message);
  };

  useEffect(() => {
    console.log(email);
  }, [email]);
  useEffect(() => {
    console.log(password);
  }, [password]);

  return (
    <>
      <h1 className=" text-8xl">Dscribe</h1>
      {!signedIn ? (
        <>
          <h1 className="text-5xl">Sign in</h1>
          <h2>Email</h2>
          <textarea
            onChange={e => {
              setEmail(e.target.value);
            }}
          ></textarea>
          <h2>Password</h2>
          <textarea
            onChange={e => {
              setPassword(e.target.value);
            }}
          ></textarea>
          <div>
            <button onClick={() => signIn()}>Sign in!</button>
          </div>
          <h2>Username</h2>
          <textarea
            onChange={e => {
              setUser(e.target.value);
            }}
          ></textarea>
          <div>
            <button onClick={() => signUp()}>Sign up!</button>
          </div>
          {error ? <p className="text-red-500">{error}</p> : <></>}
        </>
      ) : (
        <>
          <Navbar setView={setView} view={view} />
          {view === 'home' ? (
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
              <Editor />
              <button className=" bg-red-600" onClick={addCard}>
                Add Card
              </button>
              <button className=" bg-red-600" onClick={fetchDeck}>
                Get Cards
              </button>
              <button className=" bg-red-600" onClick={addStory}>
                Add Story
              </button>
              {selectedStory ? (
                deck.map(card => {
                  return (
                    <Card
                      card={card}
                      key={card.id}
                      supabase={supabase}
                      deck={deck}
                      setDeck={setDeck}
                    ></Card>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

export default App;
