import { SupabaseClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { CTAButton } from '../CTAButton/CTAButton';

interface LoginPageProps {
  supabase: SupabaseClient;
  setSignedIn: Function;
}

const LoginPage = (props: LoginPageProps) => {
  const [email, setEmail] = useState('asd@asd'); //Values for testing account.
  const [password, setPassword] = useState('asdasd123'); ///////
  const [error, setError] = useState('');
  const [user, setUser] = useState('');

  const signIn = async () => {
    const { data, error } = await props.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!error) props.setSignedIn(true);
    else console.log(error);
    console.log(data);
    console.log(error);
    if (error) setError(error.message);
  };

  const signUp = async () => {
    const { data, error } = await props.supabase.auth.signUp({
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
    if (error) setError(error.message);
  };

  return (
    <>
      <h1 className=" text-8xl">Dscribe</h1>
      <h1 className="text-5xl">Sign in</h1>
      <h2 className="text-black">Email</h2>

      <>
        <textarea
          className="bg-gray-200 text-black"
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <h2 className="text-black">Password</h2>
        <textarea
          onChange={e => {
            setPassword(e.target.value);
          }}
          className="bg-gray-200 text-black"
        />
        <div>
          <CTAButton
            title="Sign in!"
            variant="primary"
            onClick={() => signIn()}
          />
        </div>
        <h2 className="text-black">Username</h2>
        <textarea
          className="bg-gray-200 text-black"
          onChange={e => {
            setUser(e.target.value);
          }}
        ></textarea>
        <div>
          <CTAButton title="Sign up!" variant="secondary" onClick={signUp} />
        </div>
        {error ? <p className="text-red-500">{error}</p> : <></>}
      </>
    </>
  );
};

export default LoginPage;
