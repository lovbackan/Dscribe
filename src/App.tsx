import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import EditorPage from './components/EditorPage/EditorPage';
import MenuPage from './components/MenuPage/MenuPage';
import LandingPage from './components/LandingPage/LandingPage';
//Supabase setup
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL
  ? import.meta.env.VITE_SUPABASE_URL
  : ' ';
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY
  ? import.meta.env.VITE_SUPABASE_KEY
  : ' ';

const supabase = createClient(supabaseUrl, supabaseKey);

interface Story {
  id: number;
}

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [stories, setStories] = useState<Array<any>>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    if (selectedStory) setView('editor');
    // else setView('menu');
  }, [selectedStory]);

  // const [view, setView] = useState<'landing' | 'login' | 'menu' | 'editor'>(
  //   'menu',
  // );

  const [view, setView] = useState('landing');

  useEffect(() => {
    if (signedIn === true) {
      fetchStories();
    }
  }, [signedIn]);

  useEffect(() => {
    console.log(view);
    console.log(`USER IS SIGNED IN ${signedIn}`);
  }, [view]);

  const fetchStories = async () => {
    const { data, error } = await supabase.from('stories').select('*');
    console.log(data);
    if (error) console.log(error);
    else setStories(data);
  };

  //Codereview Adam: När du refreshar en sida kommer du alltid komma tillbaka till startsidan med denna lösningen vilket inte är bra. En annan routing lösning hade varit bättre.  T.ex. React routing, kanske får skicka med vissa props till de olika vyerna - eller i detta fall kanske mest från home till editorviewen. Om du vill länka din story till någon annan så kommer det funka utan routing. Blir också relevant för back funktionen i browsern. Finns protected routes att kolla upp gällande routing säkerhet, t.ex. om du inte är inloggad så kan du inte kommma åt vissa sidor. https://reactrouter.com/en/main/start/tutorial

  if (!signedIn && view === 'landing') {
    return (
      <>
        <LandingPage setView={setView} />
      </>
    );
  }

  //Login page.
  if (view === 'login') {
    return (
      <>
        <LoginPage
          supabase={supabase}
          setSignedIn={setSignedIn}
          setView={setView}
        />
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
        selectedStory={selectedStory}
        setSelectedStory={setSelectedStory}
      />
    );

  //Menu page.
  if (view === 'menu')
    return (
      <MenuPage
        supabase={supabase}
        stories={stories}
        setStories={setStories}
        setSelectedStory={setSelectedStory}
        setView={setView}
        setSignedIn={setSignedIn}
      ></MenuPage>
    );
}

export default App;

// DETTA ÄR ROUTINGLÖSNINGS IMPLEMENTATIONEN

// import { BrowserRouter as Router } from 'react-router-dom';

// import Routings from './routes/routings.tsx';

// const App = () => (
//   <Router>
//     <Routings />
//   </Router>
// );

// export default App;
