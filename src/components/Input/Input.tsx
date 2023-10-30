import React from 'react';

type InputType = 'primary' | 'secondary' | 'landing';

interface InputProps {
  placeholder: string;
  variant: InputType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .
export const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  variant,
}) => {
  const containerClasses =
    variant === 'primary'
      ? 'w-[120px] h-[30px] resize-none'
      : variant === 'secondary'
      ? 'w-[200px] h-[30px] resize-none'
      : 'w-[540px] h-[30px] resize-none';

  // const textClasses =
  //   variant === 'primary'
  //     ? 'text-white text-xl font-semibold'
  //     : variant === 'secondary'
  //     ? 'text-black text-xl font-semibold'
  //     : variant === 'landing'
  //     ? 'text-black text-3xl font-semibold'
  //     : 'text-gray-400';

  return (
    // <textarea
    //         placeholder="Email..."
    //         className="w-[120px] h-[30px] resize-none"
    //         onChange={onChange1}
    //       ></textarea>
    <input
      placeholder={placeholder}
      onChange={onChange}
      className={` ${containerClasses}`}
    ></input>
  );
};
