import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import EditorPage from './components/EditorPage/EditorPage';
import MenuPage from './components/MenuPage/MenuPage';
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
  const [stories, setStories] = useState<Array<any>>([]);

  const [view, setView] = useState<'menu' | 'editor'>('editor');
  useEffect(() => {
    if (signedIn === true) {
      fetchStories();
    }
  }, [signedIn]);

  const fetchStories = async () => {
    const { data, error } = await supabase.from('stories').select('*');
    console.log(data);
    if (error) console.log(error);
    else setStories(data);
  };

  //Login page.
  if (!signedIn) {
    return (
      <>
        <LoginPage supabase={supabase} setSignedIn={setSignedIn} />
      </>
    );
  }

  //Editor page.
  if (view === 'editor')
    return (
      <EditorPage
        supabase={supabase}
        stories={stories}
        setStories={setStories}
        fetchStories={fetchStories}
      />
    );

  //Menu page.
  if (view === 'menu') return <MenuPage></MenuPage>;
}

export default App;
