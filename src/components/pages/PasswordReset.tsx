import { useState } from 'react';

import { supabase } from '../../supabase';

import FormCard from '../Forms/FormCard';
import Form from '../Forms/Form';

const RegisterPage = () => {
  const [email, setEmail] = useState('asd@asd'); //Values for testing account.
  const [password, setPassword] = useState('asdasd123'); ///////
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState('');

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
    if (error) setError(error);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <FormCard
        formComponent={
          <Form
            variant="forgotPassword"
            onChange1={e => setEmail(e.target.value)}
            onChange2={e => setPassword(e.target.value)}
            onChange3={e => setUser(e.target.value)}
            onClick={signUp}
          />
        }
      />
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default RegisterPage;
