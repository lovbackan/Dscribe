import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';
import Editor from './components/editor/Editor';

//Supabase setup
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL
  ? import.meta.env.VITE_SUPABASE_URL
  : ' ';
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY
  ? import.meta.env.VITE_SUPABASE_KEY
  : ' ';

const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabase);

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const signInWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!error) setSignedIn(true);
    else console.log(error);
    console.log(data);
    console.log(error);
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
            <button onClick={() => signInWithEmail()}>Sign in!</button>
          </div>
          <h2>Username</h2>
          <textarea
            onChange={e => {
              setPassword(e.target.value);
            }}
          ></textarea>
          <div>
            <button onClick={() => signUp()}>Sign up!</button>
          </div>
        </>
      ) : (
        <div className="min-h-full">
          <Editor />
        </div>
      )}
    </>
  );
}

export default App;
