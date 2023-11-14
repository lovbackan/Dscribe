import { Text } from '../Text/Text';
import { ACCEPTED_ROUTES } from '../../routes/routes';
import { Link } from 'react-router-dom';

type LogoType = 'big' | 'medium' | 'small' | 'login' | 'editor';

interface LogoProps {
  variant: LogoType;
}

const Logo: React.FC<LogoProps> = ({ variant }) => {
  const logoClasses = {
    big: 'h-[300px] w-[200px] rounded-3xl border-2 border-white flex flex-col justify-center items-center ',
    login:
      'w-[200px] w-[200px] rounded-[20px] bg-inherit flex justify-center items-center border-white border-r-2 ',
    medium:
      'h-[200px] w-[133px] rounded-3xl border-2 border-white flex flex-col justify-center items-center',
    small:
      'h-[150px] w-[100px] rounded-3xl border-2 border-white flex flex-col justify-center items-center',
    editor:
      'h-[150px] w-[100px] rounded-3xl border-2 border-white flex flex-col justify-center items-center absolute cursor-pointer hover:border-4',
  };

  const className = logoClasses[variant] || logoClasses.big;

  if (variant === 'big') {
    return (
      <div id="logo" className={`${className}`}>
        <Text variant="logoBig" textColor="white" content="Codeck" />
      </div>
    );
  } else if (variant === 'login') {
    return (
      <div id="logo" className={`${className}`}>
        <Text variant="logoBig" textColor="white" content="Codeck" />
      </div>
    );
  } else if (variant === 'medium') {
    return (
      <div id="logo" className={`${className}`}>
        <Text variant="logoMedium" textColor="white" content="Codeck" />
      </div>
    );
  } else if (variant === 'small') {
    return (
      <div id="logo" className={`${className}`}>
        <Text variant="logoSmall" textColor="white" content="Codeck" />
      </div>
    );
  } else if (variant === 'editor') {
    return (
      <div className="pl-6 pt-6">
        <Link to={ACCEPTED_ROUTES.HOME}>
          <div id="logo" className={`${className}`}>
            <Text variant="logoSmall" textColor="white" content="Codeck" />
          </div>
        </Link>
      </div>
    );
  }
};
export default Logo;
