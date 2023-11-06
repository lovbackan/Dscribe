import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routings from './routes/routings.tsx';
import { supabase } from './supabase/index.ts';

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // This code runs only once when the app loads
    // and is nessesary to check if the user is logged in
    //change timers speed if you want to load a cool animation
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setTimeout(() => {
        setAppLoading(false);
      }, 100);
      setAppLoading(true);
    });
  }, []);

  // om session finns redirecta till readingpage(ska inte vara readingpage utan homepage men för testning)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (appLoading) return <div>Loading...</div>;

  return (
    <Router>
      <Routings isAuthenticated={Boolean(session)} />
    </Router>
  );
};

export default App;
