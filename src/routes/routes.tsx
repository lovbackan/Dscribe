// import React from 'react';
import type { PathRouteProps } from 'react-router-dom';
import LoginPage from '../pages/LoginPage.tsx';

import RegisterPage from '../pages/RegisterPage.tsx';
import PasswordReset from '../pages/PasswordReset.tsx';
import HomePage from '../pages/HomePage.tsx';
import LandingPage from '../pages/LandingPage.tsx';
import CommunityPage from '../pages/CommunityPage.tsx';
import EditorPage from '../pages/EditorPage.tsx';
import SettingsPage from '../pages/SettingsPage.tsx';
import ReadingPage from '../pages/ReadingPage.tsx';

// const Home = React.lazy(() => import('../components/pages/LandingPage.tsx'));
export const ACCEPTED_ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  HOME: '/home',
  REGISTER: '/register',
  PASSWORDRESET: '/passwordreset',
  COMMUNITY: '/community',
  EDITOR: '/editor',
  SETTINGS: '/settings',
  READER: '/reader',
};

export const routes: Array<PathRouteProps> = [
  {
    path: ACCEPTED_ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ACCEPTED_ROUTES.LANDING,
    element: <LandingPage />,
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
  { path: ACCEPTED_ROUTES.HOME, element: <HomePage /> },
  { path: ACCEPTED_ROUTES.COMMUNITY, element: <CommunityPage /> },
  {
    path: ACCEPTED_ROUTES.SETTINGS,
    element: <SettingsPage />,
  },
  {
    path: ACCEPTED_ROUTES.EDITOR,
    element: <EditorPage />,
  },
  {
    path: ACCEPTED_ROUTES.READER,
    element: <ReadingPage />,
  },

  //lägg till alla private routes här som du måste vara inloggad för att komma åt. Nu finns funktionalitet som redirectar dig till home
];
