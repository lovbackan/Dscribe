import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from '../components/pages/ErrorPage';

import RequireAuth from '../components/Auth/RequireAuth.tsx';
// import Page404 from '@/lib/pages/404';

import { routes, privateRoutes } from './routes';

const Routings = () => {
  return (
    <Suspense>
      <Routes>
        {routes.map(routeProps => (
          <Route {...routeProps} key={routeProps.path as string} />
        ))}
        {privateRoutes.map(({ element, ...privateRouteProps }) => (
          <Route
            element={
              <RequireAuth
                redirectTo={`/login?redirectTo=${privateRouteProps.path}`}
              >
                {element}
              </RequireAuth>
            }
            {...privateRouteProps}
            key={`privateRoute-${privateRouteProps.path}`}
          />
        ))}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};

export default Routings;
