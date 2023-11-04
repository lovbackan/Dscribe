import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

//this is a component that is used to protect routes that should only be accessed by authenticated users.

//isAuthenticated should be set to false and when the user is logged in it should be set to true.
let isAuthenticated = true;
const RequireAuth = ({
  children,
  redirectTo = '/login',
}: PrivateRouteProps) => {
  // add your own authentication logic here. SUPABASEE
  if (supabase.auth.user()) {
    isAuthenticated = true;

    console.log('user is logged in');
  } else {
    console.log('user is NOT logged in');
  }

  return isAuthenticated ? (
    (children as React.ReactElement)
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default RequireAuth;
