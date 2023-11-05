import { useState } from 'react';

import { supabase } from '../../supabase';
import { ACCEPTED_ROUTES } from '../../routes/routes';
import FormCard from '../Forms/FormCard';
import Form from '../Forms/Form';
import { useNavigate } from 'react-router-dom';

const TestLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('asd@asd'); //Values for testing account.
  const [password, setPassword] = useState('asdasd123'); ///////
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
