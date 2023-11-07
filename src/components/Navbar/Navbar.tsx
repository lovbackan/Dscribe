import { NavbarButton } from './NavbarButton';

interface NewNavbarProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  userName: string;
}

const Navbar: React.FC<NewNavbarProps> = ({ onClick, userName }) => {
  return (
    <div className=" fixed left-0 w-32 h-full bg-slate-600 flex flex-col justify-between">
      <NavbarButton variant="home" userName={userName} />
      <NavbarButton variant="community" />
      <NavbarButton variant="settings" />
      <NavbarButton variant="logout" onClick={onClick} />
    </div>
  );
};
export default Navbar;
