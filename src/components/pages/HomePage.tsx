import { Input } from '../Input/Input';
import { useState } from 'react';
import { supabase } from '../../supabase';
import { useEffect } from 'react';
import StoryList from '../StoryList/StoryList';
import { Text } from '../Text/Text';
import NewNavbar from '../Navbar/NewNavbar';
import { CTAButton } from '../CTAButton/CTAButton';
import { ACCEPTED_ROUTES } from '../../routes/routes';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Array<any>>([]);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [showSignOutPopup, setShowSignOutPopup] = useState(false);

  if (showSignOutPopup) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const fetchStories = async () => {
    const { data, error } = await supabase.from('stories').select('*');
    // console.log(data);
    if (error) console.log(error);
    else setStories(data);
  };

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

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    //här ska redirecten vara till edtiorsidan med vald story
    console.log(selectedStory);
    if (selectedStory) {
      navigate(ACCEPTED_ROUTES.EDITOR, {
        replace: true,
        state: { selectedStory: selectedStory },
      });
    }
  }, [selectedStory]);

  return (
    <div className={`w-screen min-h-screen `}>
      <NewNavbar
        onClick={() => {
          setShowSignOutPopup(true);
        }}
      />

      <div className="flex justify-center items-center">
        <Text variant="heading1" textColor="black" content="Codeck" />
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
        supabase={supabase}
        stories={stories}
        setSelectedStory={setSelectedStory}
        setStories={setStories}
      />

      {showSignOutPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-8 rounded-lg z-10 h-[300px] w-[500px] flex-col justify-center items-center">
          <h2>Are you sure</h2>
          <div className="flex flex-row justify-between">
            <CTAButton
              title="Sign out"
              variant="primary"
              onClick={handleSignOut}
            />
            <CTAButton
              title="Cancel"
              variant="secondary"
              onClick={() => setShowSignOutPopup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
