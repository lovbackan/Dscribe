import React from 'react';

import { ACCEPTED_ROUTES } from '../../routes/routes';
import { Link } from 'react-router-dom';
import { Text } from '../Text/Text';
import Logo from '../Logo/Logo';

type ButtonType = 'home' | 'community' | 'settings' | 'logout';

interface NavbarButtonProps {
  variant: ButtonType;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  userName?: string ;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .
export const NavbarButton: React.FC<NavbarButtonProps> = ({
  variant,
  onClick,
  userName,
}) => {
  if (variant === 'home') {
    return (
      <Link to={ACCEPTED_ROUTES.HOME}>
        <div className="flex flex-col justify-center items-center">
          <Logo variant="small" />
          <Text variant="p-primary" content={userName} textColor="white" />
        </div>
      </Link>
    );
  } else if (variant === 'community') {
    return (
      <Link to={ACCEPTED_ROUTES.COMMUNITY}>
        <div className="flex flex-col justify-center items-center">
          <div id="svg container">
            <svg
              width="50"
              height="51"
              viewBox="0 0 50 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.9091 38.5V36.4167C15.9091 33.654 16.8669 31.0045 18.5718 29.051C20.2766 27.0975 22.5889 26 25 26M25 26C27.4111 26 29.7234 27.0975 31.4282 29.051C33.1331 31.0045 34.0909 33.654 34.0909 36.4167V38.5M25 26C26.4466 26 27.834 25.3415 28.8569 24.1694C29.8799 22.9973 30.4545 21.4076 30.4545 19.75C30.4545 18.0924 29.8799 16.5027 28.8569 15.3306C27.834 14.1585 26.4466 13.5 25 13.5C23.5534 13.5 22.166 14.1585 21.1431 15.3306C20.1201 16.5027 19.5455 18.0924 19.5455 19.75C19.5455 21.4076 20.1201 22.9973 21.1431 24.1694C22.166 25.3415 23.5534 26 25 26ZM5 38.5V36.4167C5 34.7591 5.57467 33.1694 6.5976 31.9972C7.62053 30.8251 9.00791 30.1667 10.4545 30.1667M10.4545 30.1667C11.419 30.1667 12.3439 29.7277 13.0258 28.9463C13.7078 28.1649 14.0909 27.1051 14.0909 26C14.0909 24.8949 13.7078 23.8351 13.0258 23.0537C12.3439 22.2723 11.419 21.8333 10.4545 21.8333C9.49012 21.8333 8.5652 22.2723 7.88325 23.0537C7.2013 23.8351 6.81818 24.8949 6.81818 26C6.81818 27.1051 7.2013 28.1649 7.88325 28.9463C8.5652 29.7277 9.49012 30.1667 10.4545 30.1667ZM45 38.5V36.4167C45 34.7591 44.4253 33.1694 43.4024 31.9972C42.3795 30.8251 40.9921 30.1667 39.5455 30.1667M39.5455 30.1667C40.5099 30.1667 41.4348 29.7277 42.1168 28.9463C42.7987 28.1649 43.1818 27.1051 43.1818 26C43.1818 24.8949 42.7987 23.8351 42.1168 23.0537C41.4348 22.2723 40.5099 21.8333 39.5455 21.8333C38.581 21.8333 37.6561 22.2723 36.9742 23.0537C36.2922 23.8351 35.9091 24.8949 35.9091 26C35.9091 27.1051 36.2922 28.1649 36.9742 28.9463C37.6561 29.7277 38.581 30.1667 39.5455 30.1667Z"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Text variant="p-primary" content="community" textColor="black" />
        </div>
      </Link>
    );
  } else if (variant === 'settings') {
    return (
      <Link to={ACCEPTED_ROUTES.SETTINGS}>
        <div className="flex flex-col justify-center items-center">
          <div id="svg container">
            <svg
              width="50"
              height="51"
              viewBox="0 0 50 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M42.1875 26.6871V24.2965L45.1875 21.6715C45.7405 21.1841 46.1034 20.5168 46.212 19.7877C46.3207 19.0586 46.1681 18.3146 45.7812 17.6871L42.0937 11.4371C41.8197 10.9625 41.4257 10.5683 40.9513 10.2941C40.4768 10.0198 39.9386 9.87516 39.3906 9.8746C39.051 9.872 38.7132 9.92477 38.3906 10.0308L34.5937 11.3121C33.9382 10.8765 33.2544 10.485 32.5468 10.1402L31.75 6.20272C31.6071 5.48336 31.2157 4.83716 30.6444 4.37726C30.0731 3.91735 29.3583 3.67305 28.625 3.6871H21.3125C20.5792 3.67305 19.8643 3.91735 19.293 4.37726C18.7217 4.83716 18.3304 5.48336 18.1875 6.20272L17.3906 10.1402C16.678 10.4849 15.989 10.8764 15.3281 11.3121L11.6093 9.96835C11.2832 9.88338 10.9456 9.85173 10.6093 9.8746C10.0613 9.87516 9.52311 10.0198 9.04866 10.2941C8.57421 10.5683 8.18022 10.9625 7.90622 11.4371L4.21872 17.6871C3.85401 18.3136 3.71849 19.0475 3.83536 19.763C3.95223 20.4785 4.31422 21.131 4.85934 21.609L7.81247 24.3121V26.7027L4.85934 29.3277C4.29882 29.809 3.92693 30.4732 3.80965 31.2026C3.69238 31.932 3.8373 32.6794 4.21872 33.3121L7.90622 39.5621C8.18022 40.0367 8.57421 40.4309 9.04866 40.7051C9.52311 40.9794 10.0613 41.124 10.6093 41.1246C10.949 41.1272 11.2867 41.0744 11.6093 40.9683L15.4062 39.6871C16.0617 40.1227 16.7456 40.5142 17.4531 40.859L18.25 44.7965C18.3928 45.5158 18.7842 46.162 19.3555 46.6219C19.9268 47.0818 20.6417 47.3261 21.375 47.3121H28.75C29.4833 47.3261 30.1981 47.0818 30.7694 46.6219C31.3407 46.162 31.7321 45.5158 31.875 44.7965L32.6718 40.859C33.3844 40.5143 34.0735 40.1228 34.7343 39.6871L38.5156 40.9683C38.8382 41.0744 39.176 41.1272 39.5156 41.1246C40.0636 41.124 40.6018 40.9794 41.0763 40.7051C41.5507 40.4309 41.9447 40.0367 42.2187 39.5621L45.7812 33.3121C46.1459 32.6856 46.2814 31.9517 46.1646 31.2362C46.0477 30.5207 45.6857 29.8681 45.1406 29.3902L42.1875 26.6871ZM39.3906 37.9996L34.0312 36.1871C32.7766 37.2498 31.3428 38.0804 29.7968 38.6402L28.6875 44.2496H21.3125L20.2031 38.7027C18.6694 38.1271 17.2433 37.2978 15.9843 36.2496L10.6093 37.9996L6.92184 31.7496L11.1718 27.9996C10.8829 26.3822 10.8829 24.7264 11.1718 23.109L6.92184 19.2496L10.6093 12.9996L15.9687 14.8121C17.2233 13.7494 18.6572 12.9187 20.2031 12.359L21.3125 6.7496H28.6875L29.7968 12.2965C31.3306 12.8721 32.7567 13.7014 34.0156 14.7496L39.3906 12.9996L43.0781 19.2496L38.8281 22.9996C39.117 24.617 39.117 26.2728 38.8281 27.8902L43.0781 31.7496L39.3906 37.9996Z"
                fill="white"
              />
              <path
                d="M25 34.875C23.1458 34.875 21.3332 34.3252 19.7915 33.295C18.2498 32.2649 17.0482 30.8007 16.3386 29.0877C15.6291 27.3746 15.4434 25.4896 15.8051 23.671C16.1669 21.8525 17.0598 20.182 18.3709 18.8709C19.682 17.5598 21.3525 16.6669 23.171 16.3051C24.9896 15.9434 26.8746 16.1291 28.5877 16.8386C30.3007 17.5482 31.7649 18.7498 32.795 20.2915C33.8252 21.8332 34.375 23.6458 34.375 25.5C34.3875 26.7346 34.1536 27.9593 33.6869 29.1024C33.2202 30.2455 32.5301 31.284 31.6571 32.1571C30.784 33.0301 29.7455 33.7202 28.6024 34.1869C27.4593 34.6536 26.2346 34.8875 25 34.875ZM25 19.25C24.174 19.2308 23.3526 19.3793 22.5857 19.6866C21.8187 19.9938 21.122 20.4535 20.5377 21.0377C19.9535 21.622 19.4938 22.3187 19.1866 23.0857C18.8793 23.8526 18.7308 24.674 18.75 25.5C18.7308 26.326 18.8793 27.1474 19.1866 27.9144C19.4938 28.6813 19.9535 29.378 20.5377 29.9623C21.122 30.5465 21.8187 31.0062 22.5857 31.3135C23.3526 31.6207 24.174 31.7692 25 31.75C25.826 31.7692 26.6474 31.6207 27.4144 31.3135C28.1813 31.0062 28.878 30.5465 29.4623 29.9623C30.0465 29.378 30.5062 28.6813 30.8135 27.9144C31.1207 27.1474 31.2692 26.326 31.25 25.5C31.2692 24.674 31.1207 23.8526 30.8135 23.0857C30.5062 22.3187 30.0465 21.622 29.4623 21.0377C28.878 20.4535 28.1813 19.9938 27.4144 19.6866C26.6474 19.3793 25.826 19.2308 25 19.25Z"
                fill="white"
              />
            </svg>
          </div>
          <Text variant="p-primary" content="Settings" textColor="black" />
        </div>
      </Link>
    );
  } else if (variant === 'logout') {
    return (
      <div
        onClick={onClick}
        className="cursor-pointer flex flex-col justify-center items-center"
      >
        <div>
          <svg
            width="50"
            height="51"
            viewBox="0 0 50 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.625 15.8333V14.1667C33.625 13.2462 32.7856 12.5 31.75 12.5H14.875C13.8395 12.5 13 13.2462 13 14.1667V40.8333C13 41.7538 13.8395 42.5 14.875 42.5H31.75C32.7856 42.5 33.625 41.7538 33.625 40.8333V39.1667"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="square"
            />
            <path
              d="M22.6001 28.0996H40.6001"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="square"
            />
            <path
              d="M36.4375 21.667L43 27.5003L36.4375 33.3337"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="square"
            />
          </svg>
        </div>
        <Text variant="p-primary" textColor="black" content="Log out" />
      </div>
    );
  }
};
