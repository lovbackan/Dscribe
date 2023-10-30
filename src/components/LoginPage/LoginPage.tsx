import { SupabaseClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { LoginCard } from './LoginCard';

interface LoginPageProps {
  supabase: SupabaseClient;
  setSignedIn: Function;
  setView: Function;
}

const LoginPage = (props: LoginPageProps) => {
  const [email, setEmail] = useState('asd@asd'); //Values for testing account.
  const [password, setPassword] = useState('asdasd123'); ///////
  const [error, setError] = useState('');
  const [user, setUser] = useState('');
  const [loginPageView, setLoginPageView] = useState('login');
  let content;

  const signIn = async () => {
    const { data, error } = await props.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!error) props.setSignedIn(true), props.setView('menu');
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

  //Make error message appear on screen.
  const errorHandler = () => {
    if (error) {
      alert(error);
    }
  };
  // change the content of the login page based on the loginPageView state
  if (loginPageView === 'login') {
    content = (
      <LoginCard
        placeholder1="Email..."
        placeholder2="Password..."
        placeholderUsername="Username..."
        buttonTitle="Login"
        variant="login"
        optionTitle1="Sign up"
        onChange1={e => {
          setEmail(e.target.value);
        }}
        onChange2={e => {
          setPassword(e.target.value);
        }}
        onChange3={e => {
          setUser(e.target.value);
        }}
        optionTitle2="Forgot password?"
        option1OnClick={() => {
          setLoginPageView('signup');
        }}
        option2OnClick={() => {
          setLoginPageView('forgotPassword');
        }}
        onClick={() => {
          errorHandler();
          signIn();
        }}
      />
    );
  } else if (loginPageView === 'signup') {
    content = (
      <LoginCard
        placeholder1="Email..."
        placeholder2="Password..."
        placeholderUsername="Username..."
        buttonTitle="Sign up"
        variant="signup"
        optionTitle1="Login"
        optionTitle2="Forgot password?"
        onChange1={e => {
          setEmail(e.target.value);
        }}
        onChange2={e => {
          setPassword(e.target.value);
        }}
        onChange3={e => {
          setUser(e.target.value);
        }}
        option1OnClick={() => {
          setLoginPageView('login');
        }}
        option2OnClick={() => {
          setLoginPageView('forgotPassword');
        }}
        onClick={() => {
          errorHandler();
          signUp();
        }}
      />
    );
  } else if (loginPageView === 'forgotPassword') {
    content = (
      <LoginCard
        placeholder1="Email..."
        placeholder2="Password..."
        placeholderUsername="Username..."
        buttonTitle="Reset"
        variant="forgotPassword"
        optionTitle1="Login"
        optionTitle2="Sign up"
        onChange1={e => {
          setEmail(e.target.value);
        }}
        onChange2={e => {
          setPassword(e.target.value);
        }}
        onChange3={e => {
          setUser(e.target.value);
        }}
        option1OnClick={() => {
          setLoginPageView('login');
        }}
        option2OnClick={() => {
          setLoginPageView('signup');
        }}
        onClick={() => {
          errorHandler();
          //write email reset password function here
          console.log('hello');
        }}
      />
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-red-600">
      {content}
    </div>
  );
};

export default LoginPage;

//   return (
//     <>
//       <h1 className=" text-8xl">Dscribe</h1>
//       <h1 className="text-5xl">Sign in</h1>
//       <h2 className="text-black">Email</h2>
//       <>
//         <textarea
//           className="bg-gray-200 text-black"
//           onChange={e => {
//             setEmail(e.target.value);
//           }}
//         />
//         <h2 className="text-black">Password</h2>
//         <textarea
//           onChange={e => {
//             setPassword(e.target.value);
//           }}
//           className="bg-gray-200 text-black"
//         />
//         <div>
//           <CTAButton
//             title="Sign in!"
//             variant="primary"
//             onClick={() => signIn()}
//           />
//         </div>
//         <h2 className="text-black">Username</h2>
//         <textarea
//           className="bg-gray-200 text-black"
//           onChange={e => {
//             setUser(e.target.value);
//           }}
//         ></textarea>
//         <div>
//           <CTAButton title="Sign up!" variant="secondary" onClick={signUp} />
//         </div>
//         {error ? <p className="text-red-500">{error}</p> : <></>}
//       </>
//     </>
//   );
// };

// export default LoginPage;
