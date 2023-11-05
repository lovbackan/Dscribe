import { Link } from 'react-router-dom';
import { Text } from '../Text/Text';
import { ACCEPTED_ROUTES } from '../../routes/routes';
import { CTAButton } from '../CTAButton/CTAButton';

interface NewNavbarProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const NewNavbar: React.FC<NewNavbarProps> = ({ onClick }) => {
  return (
    <div className=" fixed left-0 w-32 h-full bg-slate-600 flex flex-col justify-between">
      <div>
        <Link to={ACCEPTED_ROUTES.HOME}>
          <Text variant="heading3" content="Codeck" textColor="black" />
        </Link>
        <Link to={ACCEPTED_ROUTES.COMMUNITY}>
          <Text variant="heading3" content="Community" textColor="black" />
        </Link>

        <CTAButton title="Logout" variant="primary" onClick={onClick} />
      </div>
    </div>
  );
};
export default NewNavbar;
