import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

//Supabase setup
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL
  ? import.meta.env.VITE_SUPABASE_URL
  : '';
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY
  ? import.meta.env.VITE_SUPABASE_KEY
  : '';

  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log(supabase);

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'bengt@bengt',
      password: 'bengtbengt123',
    });
    console.log(data);
    console.log(error);
  }


  const signInWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'bengt@bengt',
        password: 'bengtbengt123',
      })
  console.log(data);
  console.log(error);
  }


  signInWithEmail();

function App() {
  return (
    <>
      <>Dscribe</>
    </>
  )
}

export default App
