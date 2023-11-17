import React from 'react';
import { Text } from '../Text/Text';

type CardType = 'bigCard' | 'smallCard' | 'wikiCard';

interface CardDesignProps {
  title: string;
  variant: CardType;
  onClick: () => void;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .

// Dont know if this component is really needed? Fins what cases it is used in and if it is not used in many cases, delete it.

export const CardDesign: React.FC<CardDesignProps> = ({
  title,
  onClick,
  variant,
}) => {
  const containerClasses =
    variant === 'bigCard' ? 'bg-white border-black' : 'bg-white';

  // const textClasses = variant === 'bigCard' ? 'text-white' : 'text-black';

  return (
    <div
      onClick={onClick}
      className={`h-[300px]  w-[200px] rounded-lg border-2 cursor-pointer hover:border-red-300 hover:border ${containerClasses}`}
    >
      <div className=" h-auto h-max-[68px] w-[150px] bg-black opacity-70 rounded-lg p-3">
        <Text content={title} textColor="white" variant="cardTitle" />
      </div>
    </div>
  );
};
