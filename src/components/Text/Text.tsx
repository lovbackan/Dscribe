import React from 'react';

type TextType =
  | 'heading1'
  | 'heading1Bold'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'pPrimary'
  | 'pSecondary'
  | 'cardTitle'
  | 'logoBig'
  | 'logoMedium'
  | 'logoSmall'
  | 'subCategory'
  | 'hero'
  | 'heroHeading2'
  | 'loginLogo';

type TextColor = 'black' | 'white' | 'green';

interface TextProps {
  content: string;
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
    heading1: `text-3xl ${tailwindColorClass} font-inter select-none`,
    hero: `text-5xl ${tailwindColorClass} font-source font-bold select-none`,
    heading1Bold: `text-3xl ${tailwindColorClass} font-bold font-inter select-none`,
    heading2: `text-3xl ${tailwindColorClass} font-inter select-none`,
    heading3: `text-xl ${tailwindColorClass} font-inter select-none`,
    cardTitle: `text-xl ${tailwindColorClass} break-words font-inter select-none`,
    heading4: `text-base ${tailwindColorClass} font-inter select-none`,
    default: `text-sm ${tailwindColorClass} font-inter select-none`,
    logoBig: `text-[28px] font-courier ${tailwindColorClass} font-bold select-none`,
    logoMedium: `text-2xl font-courier ${tailwindColorClass} select-none`,
    logoSmall: `text-[20px] font-courier ${tailwindColorClass} font-bold select-none`,
    subCategory: `text-[10px] ${tailwindColorClass} font-inter select-none`,
    pPrimary: `text-[12px] font-inter ${tailwindColorClass} select-none`,
    pSecondary: `text-[20px] font-inter ${tailwindColorClass} select-none`,
    heroHeading2: `text-[36px] font-courier ${tailwindColorClass} font-bold select-none`,
    loginLogo: `text-[40px] font-courier ${tailwindColorClass} font-bold select-none pt-1`,
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
      pPrimary: 'p',
      pSecondary: 'p',
      cardTitle: 'h4',
      default: 'p',
      logoBig: 'h1',
      logoMedium: 'h2',
      logoSmall: 'h3',
      subCategory: 'p',
      heroHeading2: 'h2',
      loginLogo: 'h1',
    }[variant] || 'p';

  return React.createElement(elementType, { className }, content);
};
