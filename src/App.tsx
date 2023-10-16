import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

//Supabase setup
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL
  ? import.meta.env.VITE_SUPABASE_URL
  : ' ';
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY
  ? import.meta.env.VITE_SUPABASE_KEY
  : ' ';

const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabase);

// const signUp = async () => {
//   const { data, error } = await supabase.auth.signUp({
//     email: 'bengt@bengt',
//     password: 'bengtbengt123',
//   });
//   console.log(data);
//   console.log(error);
// };

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!error) setSignedIn(true);
    else console.log(error);
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
      <h1 className=" text-5xl">Dscribe</h1>
      {!signedIn ? (
        <>
          <h2>email</h2>
          <textarea
            onChange={e => {
              setEmail(e.target.value);
            }}
          ></textarea>
          <h2>password</h2>
          <textarea
            onChange={e => {
              setPassword(e.target.value);
            }}
          ></textarea>
          <button onClick={() => signInWithEmail(email, password)}></button>{' '}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
