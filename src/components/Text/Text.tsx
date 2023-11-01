import React from 'react';

type TextType =
  | 'heading1'
  | 'heading1Bold'
  | 'heading2'
  | 'heading3'
  | 'p-primary'
  | 'p-secondary';

interface TextProps {
  content: string;
  variant: TextType;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .
export const Text: React.FC<TextProps> = ({ content, variant }) => {
  const textConverter = (variant: TextType) => {
    if (variant === 'heading1') {
      return <h1 className="text-3xl text-black">{content}</h1>;
    } else if (variant === 'heading1Bold') {
      return <h1 className="text-3xl text-black font-bold">{content}</h1>;
    } else if (variant === 'heading2') {
      return <h2 className="text-2xl text-black">{content}</h2>;
    } else if (variant === 'heading3') {
      return <h3 className="text-3xl text-black">{content}</h3>;
    } else if (variant === 'p-primary') {
      return <p className="text-black">{content}</p>;
    } else if (variant === 'p-secondary') {
      return <p className="text-black">{content}</p>;
    } else {
      return <p className="text-pink">{content}</p>;
    }
  };

  return textConverter(variant);
};
