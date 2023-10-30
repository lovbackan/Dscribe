import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import StoryList from '../StoryList/StoryList';
import { SupabaseClient } from '@supabase/supabase-js';
import { Input } from '../Input/Input';

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
      <div className="w-full h-full overflow-auto">
        {menuView === 'home' ? (
          <>
            <div className="flex justify-center items-center">
              <h1>Describe</h1>
            </div>
            <section
              id="headingWrapper"
              className="flex justify-between px-[200px] pt-[140px] items-center"
            >
              <h1>Your Projects</h1>
              <Input
                placeholder="Search"
                variant="secondary"
                onChange={e => {
                  console.log(e.target.value);
                }}
              />
            </section>

            <StoryList
              supabase={props.supabase}
              stories={props.stories}
              setSelectedStory={props.setSelectedStory}
              setStories={props.setStories}
            />
          </>
        ) : (
          <h2>Inte home</h2>
        )}
      </div>
    </>
  );
};
export default MenuPage;
