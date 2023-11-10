import { Input } from '../components/Input/Input';
import { useState } from 'react';
import { supabase } from '../supabase';
import { useEffect } from 'react';
import StoryList from '../components/StoryList/StoryList';
import { Text } from '../components/Text/Text';
import Navbar from '../components/Navbar/Navbar';
import { CTAButton } from '../components/CTAButton/CTAButton';
import { ACCEPTED_ROUTES } from '../routes/routes';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Array<any>>([]);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [changeCardId, setChangeCardId] = useState<any>(null);
  const [showSignOutPopup, setShowSignOutPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  if (showSignOutPopup) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const fetchStories = async () => {
    const { data, error } = await supabase.from('stories').select('*');
    console.log(data);
    console.log(supabase.auth.getUser());
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

  const deleteStory = async (id: number) => {
    const { data, error } = await supabase
      .from('stories')
      .delete()
      .match({ id: id });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      // Filter out the deleted story from the stories state
      setStories(stories.filter(story => story.id !== id));
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    console.log(selectedStory);
    if (selectedStory) {
      navigate(ACCEPTED_ROUTES.EDITOR, {
        replace: true,
        state: {
          selectedStory: selectedStory,
        },
      });
    }
  }, [selectedStory]);

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
        <Text variant="heading1" textColor="white" content="Your Projects" />
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

      <StoryList
        supabase={supabase}
        stories={stories}
        setSelectedStory={setSelectedStory}
        setStories={setStories}
        setChangeCardId={setChangeCardId}
        deleteCard={() => {
          setShowDeletePopup(true);
          console.log(`Delete card id: ${changeCardId} `);
        }}
        changePicture={() => {}}
      />

      {showDeletePopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-8 rounded-lg z-10 h-[300px] w-[500px] flex-col justify-center items-center">
          <Text
            variant="heading2"
            textColor="white"
            content={`Are you sure you want to delete story:`}
          />
          {/* if u change the name of a story and try to delete it the old name will show up */}
          <Text
            variant="heading2"
            textColor="white"
            content={`  ${changeCardId.name}`}
          />
          <div className="flex flex-row justify-between">
            <CTAButton
              title="Delete story"
              variant="primary"
              onClick={() => {
                deleteStory(changeCardId.id);
                setShowDeletePopup(false);
              }}
            />
            <CTAButton
              title="Cancel"
              variant="secondary"
              onClick={() => setShowDeletePopup(false)}
            />
          </div>
        </div>
      )}

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
