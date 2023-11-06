import React from 'react';

type InputType = 'primary' | 'secondary' | 'landing';

interface InputProps {
  id: string;
  placeholder: string;
  variant: InputType;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .
export const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  variant,
  id,
  type,
}) => {
  const containerClasses =
    variant === 'primary'
      ? 'w-52 h-7 resize-none rounded-lg px-2 py-1 text-black'
      : variant === 'secondary'
      ? 'w-[200px] h-[30px] resize-none rounded-lg text-black px-2 py-1'
      : 'w-[540px] h-[30px] resize-none rounded-lg text-black px-2 py-1';

  return (
    <input
      type={type}
      autoComplete="on"
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      className={` ${containerClasses}`}
    ></input>
  );
};
