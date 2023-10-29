import React from 'react';

type TextAreaType = 'primary' | 'secondary' | 'other';

interface TextAreaProps {
  placeholder: string;
  variant: TextAreaType;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .
export const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  onChange,
  variant,
}) => {
  const containerClasses =
    variant === 'primary'
      ? 'w-[120px] h-[30px] resize-none'
      : variant === 'secondary'
      ? 'w-[120px] h-[30px] resize-none'
      : 'w-[120px] h-[30px] resize-none';

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
    <textarea
      placeholder={placeholder}
      onChange={onChange}
      className={` ${containerClasses}`}
    ></textarea>
  );
};
