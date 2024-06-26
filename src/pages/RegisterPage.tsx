import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

import FormCard from '../components/Forms/FormCard';
import Form from '../components/Forms/Form';
import { ACCEPTED_ROUTES } from '../routes/routes';

const RegisterPage = () => {
  const [email, setEmail] = useState(''); //Values for testing account.
  const [password, setPassword] = useState(''); ///////
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState('');

  const navigate = useNavigate();
  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data);
    if (error) setError(error);
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
    if (error) {
      setError(error);
    } else {
      await signIn(); // Wait for signIn to complete before navigating
      navigate(ACCEPTED_ROUTES.HOME); //  avigate to the readingPage
    }
  };

  return (
    <div className="w-screen h-screen flex-col flex justify-center items-center bg-gradient-to-b from-[#5179D9] to-[#0F172A]">
      <FormCard
        formComponent={
          <Form
            variant="signup"
            onChange1={e => setEmail(e.target.value)}
            onChange2={e => setPassword(e.target.value)}
            onChange3={e => setUser(e.target.value)}
            submit={signUp}
          />
        }
      />
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default RegisterPage;
