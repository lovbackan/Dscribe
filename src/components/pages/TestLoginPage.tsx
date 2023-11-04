// import { SupabaseClient } from '@supabase/supabase-js';
// import { useState } from 'react';
// import { LoginCard } from '../LoginCard/LoginCard';

// interface LoginPageProps {
//   supabase: SupabaseClient;
//   setSignedIn: Function;
//   setView: Function;
// }

// const TestLoginPage = (props: LoginPageProps) => {
//   const [email, setEmail] = useState('asd@asd'); //Values for testing account.
//   const [password, setPassword] = useState('asdasd123'); ///////
//   const [error, setError] = useState('');

//   const errorHandler = () => {
//     if (error) {
//       alert(error);
//     }
//   };

//   const signIn = async () => {
//     const { data, error } = await props.supabase.auth.signInWithPassword({
//       email: email,
//       password: password,
//     });

//     //istället för set signed in här så ska Atuh/RequireAth användas här
//     if (!error) props.setSignedIn(true), props.setView('menu');
//     else console.log(error);
//     console.log(data);
//     console.log(error);
//     if (error) setError(error.message);
//   };

//   return (
//     <div>
//       <LoginCard
//         placeholder1="Email..."
//         placeholder2="Password..."
//         placeholderUsername="Username..."
//         buttonTitle="Login"
//         variant="login"
//         optionTitle1="Sign up"
//         onChange1={e => {
//           setEmail(e.target.value);
//         }}
//         onChange2={e => {
//           setPassword(e.target.value);
//         }}
//         onChange3={e => {
//           console.log(e.target.value);
//         }}
//         optionTitle2="Forgot password?"
//         option1OnClick={() => {
//           console.log('option1OnClick');
//         }}
//         option2OnClick={() => {
//           console.log('option2OnClick');
//         }}
//         onClick={() => {
//           errorHandler();
//           signIn();
//         }}
//       />
//     </div>
//   );
// };

// export default TestLoginPage;
