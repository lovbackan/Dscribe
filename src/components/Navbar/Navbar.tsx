import { NavbarButton } from './NavbarButton';

interface NewNavbarProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Navbar: React.FC<NewNavbarProps> = ({ onClick }) => {
  return (
    <div className=" fixed left-0 w-32 h-full bg-slate-600 flex flex-col justify-between">
      <NavbarButton variant="home" />
      <NavbarButton variant="community" />
      <NavbarButton variant="settings" />
      <NavbarButton variant="logout" onClick={onClick} />
    </div>
  );
};
export default Navbar;
