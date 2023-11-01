import React from 'react';

type CardType = 'bigCard' | 'smallCard' | 'wikiCard';

interface CardDesignProps {
  title: string;
  variant: CardType;
  onClick: () => void;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .
export const CardDesign: React.FC<CardDesignProps> = ({
  title,
  onClick,
  variant,
}) => {
  const containerClasses =
    variant === 'bigCard' ? 'bg-black border-black' : 'bg-white';

  const textClasses = variant === 'bigCard' ? 'text-white' : 'text-black';

  return (
    <div
      onClick={onClick}
      className={`h-72  w-52 rounded-lg border-2 justify-center items-center cursor-pointer hover:border-red-300 hover:border ${containerClasses}`}
    >
      <span className={`text-base font-semibold break-words ${textClasses}`}>
        {title}
      </span>
    </div>
  );
};
