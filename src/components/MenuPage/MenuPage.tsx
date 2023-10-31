import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import StoryList from '../StoryList/StoryList';
import { SupabaseClient } from '@supabase/supabase-js';
import { Input } from '../Input/Input';
import { CTAButton } from '../CTAButton/CTAButton';
import { useEffect } from 'react';

interface MenuPageProps {
  supabase: SupabaseClient;
  stories: Array<any>;
  setStories: Function;
  setSelectedStory: Function;
  setView: Function;
  setSignedIn: Function;
}

const MenuPage = (props: MenuPageProps) => {
  const [menuView, setMenuView] = useState<
    'home' | 'community' | 'shop' | 'settings'
  >('home');

  const [signOut, setSignOut] = useState<boolean>(false);
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);

  const handleSignOut = async () => {
    const result = await props.supabase.auth.signOut();
    if (result.error) {
      console.log(result.error);
    } else {
      setSignOut(false); // Close the popup after sign out
      props.setSignedIn(false); // Set the signedIn state to false
      props.setView('landing'); // Set the view to 'landing'
      console.log('signed out');
    }
  };

  useEffect(() => {
    setIsScrollDisabled(signOut);
    console.log(isScrollDisabled);
  }, [signOut]);

  let signOutPopUp;

  const views = {
    home: (
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
    ),
    community: (
      <>
        <h1>COMMUNITY</h1>
      </>
    ),
    shop: (
      <>
        <h1>SHOP</h1>
      </>
    ),
    settings: (
      <>
        <h1>SETTINGS</h1>
      </>
    ),
  };
  const content = views[menuView];

  if (signOut) {
    //for some reason this works but not when i try to give the div overflowhidden
    document.body.style.overflow = 'hidden';
    signOutPopUp = (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-8 rounded-lg z-10 h-[300px] w-[500px] flex-col justify-center items-center">
        <h2>Are you sure</h2>
        <div className="flex flex-row justify-between">
          <CTAButton
            title="Sign out"
            variant="primary"
            onClick={() => {
              handleSignOut();
            }}
          />
          <CTAButton
            title="Cancel"
            variant="secondary"
            onClick={() => {
              setSignOut(false);
            }}
          />
        </div>
      </div>
    );
  } else {
    document.body.style.overflow = 'scroll';
    signOutPopUp = <></>;
  }

  return (
    <div
      className={`w-full h-full pb-32 px-32 ${
        isScrollDisabled ? 'overflow-hidden ' : 'overflow-auto'
      }`}
    >
      <Navbar
        setView={setMenuView}
        view={menuView}
        setSignOut={setSignOut}
        signOut={signOut}
      />
      {content}
      {signOutPopUp}
    </div>
  );
};
export default MenuPage;
