import { Input } from '../components/Input/Input';
import { useState } from 'react';
import { supabase } from '../supabase';
import { useEffect } from 'react';
import StoryList from '../components/StoryList/StoryList';
import { Text } from '../components/Text/Text';
import Navbar from '../components/Navbar/Navbar';
import { ACCEPTED_ROUTES } from '../routes/routes';
import { useNavigate } from 'react-router-dom';
import PopUp from '../components/PopUp/PopUp';

const HomePage = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Array<any>>([]);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [changeCardId, setChangeCardId] = useState<any>(null);
  const [showSignOutPopup, setShowSignOutPopup] = useState(false);

  if (showSignOutPopup) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  // const fetchStories = async () => {
  //   const { data, error } = await supabase.from('stories').select('*');
  //   console.log(data);
  //   console.log(supabase.auth.getUser());
  //   if (error) console.log(error);
  //   else setStories(data);
  // };

  const handleSignOut = async () => {
    const result = await supabase.auth.signOut();
    if (result.error) {
      console.log(result.error);
    } else {
      setShowSignOutPopup(false); // Close the popup after sign out
      navigate(ACCEPTED_ROUTES.LANDING);
      console.log('signed out');
    }
  };

  // useEffect(() => {
  //   fetchStories();
  // }, []);

  // useEffect(() => {
  //   console.log(selectedStory);
  //   if (selectedStory) {
  //     navigate(ACCEPTED_ROUTES.EDITOR, {
  //       replace: true,
  //       state: {
  //         selectedStory: selectedStory,
  //       },
  //     });
  //   }
  // }, [selectedStory]);

  return (
    <div
      className={`w-full min-h-screen bg-gradient-to-b from-[#5179D9] to-[#0F172A]`}
    >
      <Navbar
        onClick={() => {
          setShowSignOutPopup(true);
        }}
      />

      <div
        id="search-bar"
        className="flex flex-col w-[500px] text-left pl-[212px] pt-[140px] pb-[40px] gap-6"
      >
        <Text
          variant="heading1"
          textColor="white"
          content="Published projects"
        />
        <Input
          type="text"
          id="search"
          autoComplete="off"
          placeholder="Search"
          variant="secondary"
          onChange={e => {
            console.log(e.target.value);
          }}
        />
      </div>

      {showSignOutPopup && (
        <PopUp
          variant="logOut"
          action={handleSignOut}
          cancel={() => {
            setShowSignOutPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
