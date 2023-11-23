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
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  variant,
  id,
  type,
  onBlur,
  autoComplete,
  onKeyDown,
  autoFocus,
}) => {
  const containerClasses =
    variant === 'primary'
      ? 'w-52 h-7 resize-none rounded-lg px-2 py-1 text-black font-inter hover:border-black hover:border '
      : variant === 'secondary'
      ? 'w-[200px] h-[30px] resize-none rounded-lg text-black px-2 py-1 font-inter hover:border-black hover:border'
      : variant === 'cardTitle'
      ? 'w-[150px] h-[40px] resize-none rounded-lg text-white px-2 py-1 text-center bg-black placeholder-white hover:border-white hover:border hover:border-2 bg-opacity-70 font-inter'
      : 'w-[540px] h-[30px] resize-none rounded-lg text-black px-2 py-1 font-inter';

  if (variant === 'cardTitle') {
    return (
      <div className="inline-block inputWrapper ">
        <div className="editSymbol pt-6 pr-[70px] pointer-events-none"></div>
        <input
          type={type}
          autoComplete="off"
          id={id}
          defaultValue={placeholder}
          onKeyDown={e => {
            const target: HTMLInputElement | any = e.target;
            if (e.key === 'Enter') target.blur();
          }}
          onChange={onChange}
          onBlur={onBlur}
          className={` ${containerClasses}`}
        ></input>
      </div>
    );
  } else {
    return (
      <input
        type={type}
        autoComplete={autoComplete}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={` ${containerClasses}`}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        onClick={e => {
          e.stopPropagation();
        }}
      ></input>
    );
  }
};
