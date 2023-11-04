import React from 'react';
import type { PathRouteProps } from 'react-router-dom';
import TestLoginPage from '../components/pages/TestLoginPage.tsx';
import ReadingPage from '../components/pages/ReadingPage.tsx';
import RegisterPage from '../components/pages/RegisterPage.tsx';
import PasswordReset from '../components/pages/PasswordReset.tsx';

const Home = React.lazy(() => import('../components/pages/LandingPage.tsx'));
export const ACCEPTED_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  READINGPAGE: '/readingpage',
  REGISTER: '/register',
  PASSWORDRESET: '/passwordreset',
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
  {
    path: ACCEPTED_ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ACCEPTED_ROUTES.PASSWORDRESET,
    element: <PasswordReset />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [
  { path: ACCEPTED_ROUTES.READINGPAGE, element: <ReadingPage /> },
  //lägg till alla private routes här som du måste vara inloggad för att komma åt. Nu finns funktionalitet som redirectar dig till home
];
