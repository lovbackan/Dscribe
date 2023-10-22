import React from 'react';

type ButtonType = 'primary' | 'secondary' | 'red' | 'disabled';

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
      ? 'bg-black border-black'
      : variant === 'secondary'
      ? 'bg-white'
      : variant === 'red'
      ? 'bg-red-600'
      : 'bg-white border-gray-400';

  const textClasses =
    variant === 'primary'
      ? 'text-white'
      : variant === 'secondary'
      ? 'text-black'
      : variant === 'red'
      ? 'text-white'
      : 'text-gray-400';

  return (
    <button
      onClick={onClick}
      className={`h-12 w-20 rounded-lg border-2 justify-center items-center ${containerClasses}`}
    >
      <span className={`text-xl font-semibold ${textClasses}`}>{title}</span>
    </button>
  );
};
