import React from 'react';

import { ACCEPTED_ROUTES } from '../../routes/routes';
import { Link } from 'react-router-dom';
import { Text } from '../Text/Text';
import Logo from '../Logo/Logo';

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
  if (variant === 'home') {
    return (
      <Link to={ACCEPTED_ROUTES.HOME}>
        <div className="flex flex-col justify-center items-center hover:bg-[#0F172A] h-[207px] rounded-r-lg">
          <Logo variant="small" />
          <Text variant="p-primary" content="Home" textColor="white" />
        </div>
      </Link>
    );
  } else if (variant === 'community') {
    return (
      <Link to={ACCEPTED_ROUTES.COMMUNITY}>
        <div className="flex flex-col justify-center items-center hover:bg-[#0F172A] h-[128px] rounded-r-lg">
          <div className="navBar-community"></div>
          <Text variant="p-primary" content="Community" textColor="white" />
        </div>
      </Link>
    );
  } else if (variant === 'settings') {
    return (
      <Link to={ACCEPTED_ROUTES.SETTINGS}>
        <div className="flex flex-col justify-center items-center hover:bg-[#0F172A] h-[128px] rounded-r-lg">
          <div className="navBar-settings"></div>
          <Text variant="p-primary" content="Settings" textColor="white" />
        </div>
      </Link>
    );
  } else if (variant === 'logout') {
    return (
      <div
        onClick={onClick}
        className="cursor-pointer flex flex-col justify-center items-center hover:bg-[#0F172A] h-[128px] rounded-r-lg"
      >
        <div className="navBar-logout"></div>
        <Text variant="p-primary" textColor="white" content="Log out" />
      </div>
    );
  }
};
