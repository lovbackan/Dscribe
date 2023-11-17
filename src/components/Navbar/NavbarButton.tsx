import React from 'react';

import { ACCEPTED_ROUTES } from '../../routes/routes';
import { Link } from 'react-router-dom';
import { Text } from '../Text/Text';
import Logo from '../Logo/Logo';
import { useNavigate } from 'react-router-dom';

type ButtonType = 'home' | 'community' | 'settings' | 'logout';

interface NavbarButtonProps {
  variant: ButtonType;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  userName?: string;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .
export const NavbarButton: React.FC<NavbarButtonProps> = ({
  variant,
  onClick,
  // userName,
}) => {
  const navigate = useNavigate();

  if (variant === 'home') {
    return (
      <div
        className="flex flex-col justify-center items-center hover:bg-[#0F172A] h-[207px] rounded-r-lg cursor-pointer"
        onClick={() => navigate(ACCEPTED_ROUTES.HOME)}
      >
        <Logo variant="small" />
        <Text variant="pSecondary" content="Home" textColor="white" />
      </div>
    );
  } else if (variant === 'community') {
    return (
      <div
        className="flex flex-col justify-center items-center hover:bg-[#0F172A] h-[128px] rounded-r-lg cursor-pointer"
        onClick={() => navigate(ACCEPTED_ROUTES.COMMUNITY)}
      >
        <div className="navBar-community"></div>
        <Text variant="pSecondary" content="Community" textColor="white" />
      </div>
    );
  } else if (variant === 'settings') {
    return (
      <div
        className="flex flex-col justify-center items-center hover:bg-[#0F172A] h-[128px] rounded-r-lg cursor-pointer"
        onClick={() => navigate(ACCEPTED_ROUTES.SETTINGS)}
      >
        <div className="navBar-settings"></div>
        <Text variant="pSecondary" content="Settings" textColor="white" />
      </div>
    );
  } else if (variant === 'logout') {
    return (
      <div
        onClick={onClick}
        className="cursor-pointer flex flex-col justify-center items-center hover:bg-[#0F172A] h-[128px] rounded-r-lg"
      >
        <div className="navBar-logout"></div>
        <Text variant="pSecondary" textColor="white" content="Log out" />
      </div>
    );
  }
};
