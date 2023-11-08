import React from 'react';

type InputType = 'primary' | 'secondary' | 'storySearch' | 'cardTitle';

interface InputProps {
  id: string;
  placeholder: string;
  variant: InputType;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  variant,
  id,
  type,
  onBlur,
}) => {
  const containerClasses =
    variant === 'primary'
      ? 'w-52 h-7 resize-none rounded-lg px-2 py-1 text-black'
      : variant === 'secondary'
      ? 'w-[200px] h-[30px] resize-none rounded-lg text-black px-2 py-1'
      : variant === 'cardTitle'
      ? 'w-[100px] h-[30px] resize-none rounded-lg text-white px-2 py-1 text-center bg-black placeholder-white hover:border-white hover:border hover:border-2 bg-opacity-70'
      : 'w-[540px] h-[30px] resize-none rounded-lg text-black px-2 py-1';

  return (
    <input
      type={type}
      autoComplete="on"
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      className={` ${containerClasses}`}
    ></input>
  );
};
