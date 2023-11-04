import { useState } from 'react';

import { supabase } from '../../supabase';

import FormCard from '../Forms/FormCard';
import Form from '../Forms/Form';

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

  // const signOut = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   if (error) setError(error);
  // };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <FormCard
        formComponent={
          <Form
            variant="login"
            onChange1={e => setEmail(e.target.value)}
            onChange2={e => setPassword(e.target.value)}
            onClick={signIn}
          />
        }
      />

      {error && <p>{error.message}</p>}
    </div>
  );
};

export default TestLoginPage;
