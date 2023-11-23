import { useEffect, useState } from 'react';

import { supabase } from '../supabase';
import { ACCEPTED_ROUTES } from '../routes/routes';
import FormCard from '../components/Forms/FormCard';
import Form from '../components/Forms/Form';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data);
    if (error) {
      setError(error);
    } else {
      navigate(ACCEPTED_ROUTES.HOME); //  avigate to the readingPage
    }
  };

  //WRITE ERROR MESSAGES FOR INVALID EMAIL AND PASSWORD

  return (
    <div className="w-screen h-screen flex-col flex justify-center items-center bg-gradient-to-b from-[#5179D9] to-[#0F172A] overflow-hidden">
      <FormCard
        animate={true}
        formComponent={
          <Form
            variant="login"
            onChange1={e => setEmail(e.target.value)}
            onChange2={e => setPassword(e.target.value)}
            submit={signIn}
          />
        }
      />

      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default LoginPage;
