import Navbar from '../Navbar/Navbar';
import { useState } from 'react';

const MenuPage = () => {
  const [menuView, setMenuView] = useState<
    'home' | 'community' | 'shop' | 'settings' | 'signOut'
  >('home');

  return (
    <>
      <Navbar setView={setMenuView} view={menuView} />
      {menuView === 'home' ? <h1>Home </h1> : <h2>Inte home</h2>}
    </>
  );
};
export default MenuPage;
