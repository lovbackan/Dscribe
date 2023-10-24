import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import StoryList from '../StoryList/StoryList';
import { SupabaseClient } from '@supabase/supabase-js';

interface MenuPageProps {
  supabase: SupabaseClient;
  stories: Array<any>;
  setStories: Function;
  setSelectedStory: Function;
}

const MenuPage = (props: MenuPageProps) => {
  const [menuView, setMenuView] = useState<
    'home' | 'community' | 'shop' | 'settings' | 'signOut'
  >('home');

  return (
    <>
      <Navbar setView={setMenuView} view={menuView} />
      <StoryList
        supabase={props.supabase}
        stories={props.stories}
        setSelectedStory={props.setSelectedStory}
        setStories={props.setStories}
      />
      {menuView === 'home' ? <h1>Home </h1> : <h2>Inte home</h2>}
    </>
  );
};
export default MenuPage;
