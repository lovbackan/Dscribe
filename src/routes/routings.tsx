import { Routes, Route, Navigate } from 'react-router-dom';
import ErrorPage from '../components/pages/ErrorPage';

// import Page404 from '@/lib/pages/404';

import { routes, privateRoutes, ACCEPTED_ROUTES } from './routes';
interface Props {
  isAuthenticated: boolean;
}
const Routings: React.FC<Props> = ({ isAuthenticated }) => {
  return (
    <Routes>
      {routes.map(routeProps => (
        <Route {...routeProps} key={routeProps.path as string} />
      ))}
      {privateRoutes.map(({ element, ...privateRouteProps }) => (
        <Route
          element={
            isAuthenticated ? element : <Navigate to={ACCEPTED_ROUTES.LOGIN} />
          }
          {...privateRouteProps}
          key={`privateRoute-${privateRouteProps.path}`}
        />
      ))}
      {/* erropage verkar inte funka just nu */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Routings;
