import React from 'react';

type TextType =
  | 'heading1'
  | 'heading1Bold'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'p-primary'
  | 'p-secondary'
  | 'cardTitle'
  | 'logoBig'
  | 'logoMedium'
  | 'logoSmall'
  | 'subCategory'
  | 'hero';

type TextColor = 'black' | 'white' | 'green';

interface TextProps {
  content?: string;
  variant: TextType;
  textColor: TextColor;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .
export const Text: React.FC<TextProps> = ({ content, variant, textColor }) => {
  const textColorClasses = {
    black: 'text-black',
    white: 'text-white',
    green: 'text-green-700',
    default: 'text-pink-700',
  };

  const tailwindColorClass =
    textColorClasses[textColor] || textColorClasses.default;

  const tailwindClasses = {
    heading1: `text-3xl ${tailwindColorClass}`,
    hero: `text-5xl ${tailwindColorClass} font-source`,
    heading1Bold: `text-3xl ${tailwindColorClass} font-bold`,
    heading2: `text-2xl ${tailwindColorClass}`,
    heading3: `text-3xl ${tailwindColorClass}`,
    'p-primary': tailwindColorClass,
    'p-secondary': tailwindColorClass,
    cardTitle: `text-xl ${tailwindColorClass} break-words`,
    heading4: `text-base ${tailwindColorClass}`,
    default: `text-sm ${tailwindColorClass}`,
    logoBig: `text-3xl font-courier ${tailwindColorClass}`,
    logoMedium: `text-2xl font-courier ${tailwindColorClass}`,
    logoSmall: `text-xl font-courier ${tailwindColorClass}`,
    subCategory: `text-[10px] ${tailwindColorClass}`,
  };

  const className = tailwindClasses[variant] || tailwindClasses.default;

  const elementType =
    {
      heading1: 'h1',
      hero: 'h1',
      heading1Bold: 'h1',
      heading2: 'h2',
      heading3: 'h3',
      heading4: 'h4',
      'p-primary': 'p',
      'p-secondary': 'p',
      cardTitle: 'h4',
      default: 'p',
      logoBig: 'h1',
      logoMedium: 'h2',
      logoSmall: 'h3',
      subCategory: 'p',
    }[variant] || 'p';

  return React.createElement(elementType, { className }, content);
};
