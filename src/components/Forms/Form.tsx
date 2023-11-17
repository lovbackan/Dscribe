import { CTAButton } from '../CTAButton/CTAButton';
import { Input } from '../Input/Input';
import { useNavigate } from 'react-router-dom';
import { ACCEPTED_ROUTES } from '../../routes/routes';
import { Text } from '../Text/Text';

type LoginCardType = 'login' | 'signup' | 'forgotPassword';

interface FormProps {
  variant: LoginCardType;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onChange1: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange2?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange3?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form: React.FC<FormProps> = ({
  variant,
  onClick,
  onChange1,
  onChange2,
  onChange3,
}) => {
  const navigate = useNavigate();
  if (variant === 'login') {
    return (
      <>
        <Text variant="heading3" content="Login" textColor="white" />
        <div id="inputContainer" className="gap-2.5 flex flex-col mt-4  ">
          <Input
            type="email"
            id="email"
            variant="primary"
            placeholder="Email"
            onChange={onChange1}
            autoComplete="on"
          />
          {onChange2 && (
            <Input
              type="password"
              id="password"
              variant="primary"
              placeholder="Password"
              onChange={onChange2}
            />
          )}
        </div>
        <div className="py-5 flex flex-col justify-items-start items-start w-[200px]">
          <div className="mb-[20px]">
            <CTAButton title="Login" variant="primary" onClick={onClick} />
          </div>

          <div
            onClick={() => navigate(ACCEPTED_ROUTES.REGISTER)}
            className="cursor-pointer"
          >
            <Text
              variant="pPrimary"
              content="Create account"
              textColor="white"
            />
          </div>

          <div
            onClick={() => navigate(ACCEPTED_ROUTES.PASSWORDRESET)}
            className="cursor-pointer"
          >
            <Text
              variant="pPrimary"
              content="Forgot Password?"
              textColor="white"
            />
          </div>
        </div>
      </>
    );
  } else if (variant === 'signup') {
    return (
      <>
        <Text variant="heading3" content="Sign Up" textColor="white" />
        <div id="inputContainer" className="gap-2.5 flex flex-col mt-4 ">
          <Input
            type="email"
            id="email"
            variant="primary"
            placeholder="Email"
            onChange={onChange1}
            autoComplete="on"
          />
          {onChange2 && (
            <Input
              type="password"
              id="password"
              variant="primary"
              placeholder="Password"
              onChange={onChange2}
            />
          )}
          {onChange3 && (
            <Input
              type="text"
              id="username"
              variant="primary"
              placeholder="Username"
              onChange={onChange3}
            />
          )}
        </div>

        <div className="py-5 flex flex-col justify-items-start items-start w-[200px]">
          <div className="mb-[20px]">
            <CTAButton title="Register" variant="primary" onClick={onClick} />
          </div>

          <div
            onClick={() => navigate(ACCEPTED_ROUTES.LOGIN)}
            className="cursor-pointer"
          >
            <Text variant="pPrimary" content="Login" textColor="white" />
          </div>
          <div
            onClick={() => navigate(ACCEPTED_ROUTES.PASSWORDRESET)}
            className="cursor-pointer"
          >
            <Text
              variant="pPrimary"
              content="Forgot password?"
              textColor="white"
            />
          </div>
        </div>
      </>
    );
  } else if (variant === 'forgotPassword') {
    return (
      <>
        <Text variant="heading3" content="Reset password" textColor="white" />
        <Input
          type="email"
          id="email"
          variant="primary"
          placeholder="Email"
          onChange={onChange1}
          autoComplete="on"
        />

        <CTAButton title="Reset" variant="primary" onClick={onClick} />

        <div id="optionsContainer" className="flex flex-col">
          <div
            onClick={() => navigate(ACCEPTED_ROUTES.LOGIN)}
            className="cursor-pointer"
          >
            <Text variant="pPrimary" content="Login" textColor="white" />
          </div>
          <div
            onClick={() => navigate(ACCEPTED_ROUTES.REGISTER)}
            className="cursor-pointer"
          >
            <Text
              variant="pPrimary"
              content="Create account"
              textColor="white"
            />
          </div>
        </div>
      </>
    );
  }
};

export default Form;
