import React from 'react';

type ButtonType = 'primary' | 'secondary' | 'landing' | 'disabled';

interface CTAButtonProps {
  title: string;
  variant: ButtonType;
  onClick: () => void;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .
export const CTAButton: React.FC<CTAButtonProps> = ({
  title,
  onClick,
  variant,
}) => {
  const containerClasses =
    variant === 'primary'
      ? 'bg-black border-black h-12 w-20 rounded-lg border-2 justify-center items-center'
      : variant === 'secondary'
      ? 'bg-white h-12 w-20 rounded-lg border-2 justify-center items-center'
      : variant === 'landing'
      ? ''
      : 'bg-white border-gray-400';

  const textClasses =
    variant === 'primary'
      ? 'text-white text-xl font-semibold'
      : variant === 'secondary'
      ? 'text-black text-xl font-semibold'
      : variant === 'landing'
      ? 'text-black text-3xl font-semibold'
      : 'text-gray-400';

  return (
    <button onClick={onClick} className={` ${containerClasses}`}>
      <span className={` ${textClasses}`}>{title}</span>
    </button>
  );
};
