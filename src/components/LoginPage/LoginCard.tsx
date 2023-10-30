import React from 'react';
import { CTAButton } from '../CTAButton/CTAButton';
import { Input } from '../Input/Input';
type LoginCardType = 'login' | 'signup' | 'forgotPassword';

interface LoginCardProps {
  placeholder1: string;
  onChange1: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder2: string;
  onChange2: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholderUsername: string;
  onChange3: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant: LoginCardType;
  buttonTitle: string;
  optionTitle1: string;
  optionTitle2: string;
  option1OnClick: () => void;
  option2OnClick: () => void;
  onClick: () => void;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .
export const LoginCard: React.FC<LoginCardProps> = ({
  placeholder1,
  placeholder2,
  placeholderUsername,
  onClick,
  buttonTitle,
  optionTitle1,
  optionTitle2,
  option1OnClick,
  option2OnClick,
  variant,
  onChange1,
  onChange2,
  onChange3,
}) => {
  const containerClasses =
    variant === 'login'
      ? 'flex flex-col justify-center items-center'
      : variant === 'signup'
      ? 'flex flex-col'
      : 'hidden';

  const userName = variant === 'signup' ? 'flex flex-col' : 'hidden';

  const forgotPassword =
    variant === 'forgotPassword' ? 'flex flex-col' : 'hidden';

  return (
    <div
      id="outerContainer"
      className="w-[400px] h-[300px] rounded-[20px] flex-row bg-cyan-200 flex"
    >
      <div
        id="logoContainer"
        className="w-[200px] h-full rounded-l-[20px] bg-slate-500 flex justify-center items-center"
      >
        <h1 className="text-xl">Dscribe</h1>
      </div>
      <div
        id="infoContainer"
        className="w-[200px] h-[300px] rounded-r-[20px] bg-slate-400 flex justify-center items-center flex-col"
      >
        <div
          id="forgotPassswordView"
          className={`${forgotPassword} flex justify-center items-center`}
        >
          <p className="text-[12px]">Forgot your password?</p>
          <p className="text-[12px] mb-[36px]">
            Don't you worry, fill in your email to reset your password
          </p>
          {/* <textarea
            placeholder="Email..."
            className="w-[120px] h-[30px] resize-none"
            onChange={onChange1}
          ></textarea> */}
          <Input
            placeholder={placeholder1}
            onChange={onChange1}
            variant="primary"
          />
        </div>

        <div id="inputWrappper" className={`${containerClasses} gap-[20px] `}>
          <Input
            placeholder={placeholder1}
            onChange={onChange1}
            variant="primary"
          />
          <Input
            placeholder={placeholder2}
            onChange={onChange2}
            variant="primary"
          />
        </div>

        <div id="inputWrappperSetUser" className={` ${userName} pt-[20px]`}>
          {/* <textarea
            placeholder={placeholderUsername}
            onChange={onChange3}
            className="w-[120px] h-[30px] resize-none"
          ></textarea> */}
          <Input
            placeholder={placeholderUsername}
            onChange={onChange3}
            variant="primary"
          />
        </div>

        <div id="buttonWrapper" className="my-[20px]">
          <CTAButton title={buttonTitle} variant="primary" onClick={onClick} />
        </div>
        <div id="optionsContainer" className="flex flex-col">
          <a className="text-xs" href="#" onClick={option1OnClick}>
            {optionTitle1}
          </a>
          <a className="text-xs" href="#" onClick={option2OnClick}>
            {optionTitle2}
          </a>
        </div>
        {/* {error ? <p className="text-red-500">{error}</p> : <></>} */}
      </div>
    </div>
  );
};