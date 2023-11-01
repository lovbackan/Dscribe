import React from 'react';

type TextType =
  | 'heading1'
  | 'heading1Bold'
  | 'heading2'
  | 'heading3'
  | 'p-primary'
  | 'p-secondary'
  | 'cardTitle';

type TextColor = 'black' | 'white' | 'green';

interface TextProps {
  content: string;
  variant: TextType;
  textColor: TextColor;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .
export const Text: React.FC<TextProps> = ({ content, variant, textColor }) => {
  const textConverter = (variant: TextType, textColor: TextColor) => {
    let tailwindColor = '';
    if (textColor === 'black') {
      tailwindColor = 'text-black';
    } else if (textColor === 'white') {
      tailwindColor = 'text-white';
    } else if (textColor === 'green') {
      tailwindColor = 'text-green-700';
    } else {
      tailwindColor = 'text-pink';
    }

    if (variant === 'heading1') {
      return <h1 className={`text-3xl ${tailwindColor}`}>{content}</h1>;
    } else if (variant === 'heading1Bold') {
      return (
        <h1 className={`text-3xl ${tailwindColor} font-bold`}>{content}</h1>
      );
    } else if (variant === 'heading2') {
      return <h2 className={`text-2xl ${tailwindColor}`}>{content}</h2>;
    } else if (variant === 'heading3') {
      return <h3 className={`text-3xl ${tailwindColor}`}>{content}</h3>;
    } else if (variant === 'p-primary') {
      return <p className={tailwindColor}>{content}</p>;
    } else if (variant === 'p-secondary') {
      return <p className={tailwindColor}>{content}</p>;
    } else if (variant === 'cardTitle') {
      return (
        <h4 className={`text-xl ${tailwindColor} break-words`}>{content}</h4>
      );
    } else {
      return <p className={` text-sm ${tailwindColor}`}>{content}</p>;
    }
  };

  return textConverter(variant, textColor);
};
