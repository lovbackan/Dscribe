import React from 'react';
import type { PathRouteProps } from 'react-router-dom';
import TestLoginPage from '../components/pages/TestLoginPage.tsx';

const Home = React.lazy(() => import('../components/pages/LandingPage.tsx'));
export const ACCEPTED_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
};

export const routes: Array<PathRouteProps> = [
  {
    path: ACCEPTED_ROUTES.LOGIN,
    element: <TestLoginPage />,
  },
  {
    path: ACCEPTED_ROUTES.HOME,
    element: <Home />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [
  //lägg till alla private routes här som du måste vara inloggad för att komma åt. Nu finns funktionalitet som redirectar dig till home
];