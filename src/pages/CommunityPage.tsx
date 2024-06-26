import { Input } from '../components/Input/Input';
import { useState } from 'react';
import { supabase } from '../supabase';
import { useEffect } from 'react';
// import StoryList from '../components/StoryList/StoryList';
import { Text } from '../components/Text/Text';
import Navbar from '../components/Navbar/Navbar';
import { ACCEPTED_ROUTES } from '../routes/routes';
import { useNavigate } from 'react-router-dom';
import PopUp from '../components/PopUp/PopUp';
import StoryList from '../components/StoryList/StoryList';

const HomePage = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Array<any>>([]);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  //const [changeCardId, setChangeCardId] = useState<any>(null);
  //const [filteredStories, setFilteredStories] = useState(stories);
  const [showSignOutPopup, setShowSignOutPopup] = useState(false);

  const [filteredStories, setFilteredStories] = useState(stories);
  useEffect(() => {
    setFilteredStories(stories);
  }, [stories]);

  // if (showSignOutPopup) {
  //   document.body.style.overflow = 'hidden';
  // } else {
  //   document.body.style.overflow = 'auto';
  // }

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('published', true);
    if (error) console.log(error);
    else setStories([...data]);
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
    if (selectedStory) {
      navigate(ACCEPTED_ROUTES.READER, {
        replace: true,
        state: {
          selectedStory: selectedStory,
        },
      });
    }
  }, [selectedStory]);

  return (
    <div className={`w-full min-h-screen`}>
      <div className="bg-gradient-to-b from-[#5179D9] to-[#0F172A] h-screen fixed w-full top-0 -z-10"></div>
      <div
        className={`${
          showSignOutPopup
            ? 'opacity-40 bg-black min-h-screen pointer-events-none '
            : 'opacity-100'
        }`}
      >
        <Navbar
          onClick={() => {
            setShowSignOutPopup(true);
          }}
        />

        <div
          id="search-bar"
          className="flex flex-col w-[500px] text-left pl-[212px] pt-[40px] pb-[40px] gap-6"
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
            autoFocus={true}
            onChange={e => {
              const value = e.target.value.toLowerCase();
              if (value === '') {
                setFilteredStories(stories);
              } else {
                setFilteredStories(
                  stories.filter(
                    story =>
                      story &&
                      story.name &&
                      story.name.toLowerCase().includes(value),
                  ),
                );
              }
            }}
          />
        </div>
        <div className="flex flex-wrap w-full justify-left items-center gap-[40px] pl-[212px] pr-[100px] pb-12 ">
          <StoryList
            supabase={supabase}
            stories={filteredStories}
            setSelectedStory={setSelectedStory}
            setStories={setStories}
            author={true}
          />
        </div>
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
