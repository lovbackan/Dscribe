import { SupabaseClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { LoginCard } from '../LoginCard/LoginCard';
import { supabase } from '../../supabase';
import { Link } from 'react-router-dom';
import { ACCEPTED_ROUTES } from '../../routes/routes';

const TestLoginPage = () => {
  const [email, setEmail] = useState('asd@asd'); //Values for testing account.
  const [password, setPassword] = useState('asdasd123'); ///////
  const [error, setError] = useState<Error | null>(null);

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data);
    if (error) setError(error);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) setError(error);
  };

  return (
    <div>
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign in</button>
      <button onClick={signOut}>Sign out</button>
      <Link to={ACCEPTED_ROUTES.READINGPAGE}>READING PAGE</Link>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default TestLoginPage;
