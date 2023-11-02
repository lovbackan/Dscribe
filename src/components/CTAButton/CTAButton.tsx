import React from 'react';

type ButtonType =
  | 'primary'
  | 'secondary'
  | 'landing'
  | 'minimize/close'
  | 'cardCategory'
  | 'disabled';

interface CTAButtonProps {
  title: string | number;
  variant: ButtonType;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .
export const CTAButton: React.FC<CTAButtonProps> = ({
  title,
  onClick,
  variant,
}) => {
  const containerClasses =
    variant === 'primary'
      ? 'bg-white  h-[27px] w-[80px] rounded-[5px] flex justify-center items-center hover:border-black hover:border'
      : variant === 'secondary'
      ? 'bg-white border-black h-[27px] w-[139px] rounded-[5px] flex justify-center items-center hover:border-black hover:border'
      : variant === 'landing'
      ? ''
      : variant === 'cardCategory'
      ? 'bg-black h-4 min-w-[40px] w-auto rounded-tl-[5px] rounded-br-[5px] flex justify-center items-center hover:border-white hover:border'
      : variant === 'minimize/close'
      ? 'w-[20px] h-[20px] rounded-[5px] flex justify-center items-center hover:border-black hover:border bg-white'
      : 'bg-purple-400';

  const textClasses =
    variant === 'primary'
      ? 'text-black text-[12px]'
      : variant === 'secondary'
      ? 'text-black text-[12px]'
      : variant === 'landing'
      ? 'text-black text-3xl font-semibold'
      : variant === 'cardCategory'
      ? 'text-white text-xs'
      : variant === 'minimize/close'
      ? 'text-black text-[12px]'
      : 'text-purple-400';

  return (
    <button onClick={onClick} className={` ${containerClasses}`}>
      <span className={` ${textClasses}`}>{title}</span>
    </button>
  );
};
