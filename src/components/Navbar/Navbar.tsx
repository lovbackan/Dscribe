import { NavbarButton } from './NavbarButton';
// import { supabase } from '../../supabase';
// import { useEffect, useState } from 'react';

interface NewNavbarProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Navbar: React.FC<NewNavbarProps> = ({ onClick }) => {
  // const [userName, setUserName] = useState<string>('');

  // const fetchUser = async () => {
  //   let { data, error } = await supabase.auth.getUser();
  //   const userId = data.user?.id;
  //   const result = await supabase
  //     .from('users')
  //     .select('username')
  //     .eq('id', userId)
  //     .single();

  //   if (error) console.log(error);
  //   else setUserName(result.data?.username);
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return (
    <div className=" fixed left-0 w-32 h-full flex flex-col justify-between py-[111px]">
      <NavbarButton variant="home" />
      <NavbarButton variant="community" />
      <NavbarButton variant="settings" />
      <NavbarButton variant="logout" onClick={onClick} />
    </div>
  );
};
export default Navbar;
