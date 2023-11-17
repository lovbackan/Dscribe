import { supabase } from '../supabase';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ACCEPTED_ROUTES } from '../routes/routes';
import RichTextViewer from '../components/RichTextViewer/RichTextViewer';
import Logo from '../components/Logo/Logo';
import { Text } from '../components/Text/Text';

const ReadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedStory = location.state.selectedStory;
  const [story, setStory] = useState<{
    id: string;
    name: string;
    text: string;
  } | null>();

  useEffect(() => {
    if (selectedStory === null) {
      navigate(ACCEPTED_ROUTES.HOME);
    }
    // fetchDeck();
    // fetchCategories();
    fetchStory();
    // fetchTags();
  }, [selectedStory]);

  const fetchStory = async () => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', selectedStory.id)
      .single();
    if (error) console.log(error);
    else setStory(data);
  };

  return (
    <>
      <div
        className={`h-screen w-screen relative flex justify-center overflow-hidden bg-[#0F172A]`}
      >
        <div className="absolute flex justify-center items-center w-screen">
          <Text
            variant="heading1Bold"
            textColor="white"
            content={story ? story.name : ''}
          />
        </div>
        <Logo variant="editor" />
        <div
          className={`absolute w-[60%] h-[100%] mt-12 rounded-tl-lg rounded-tr-lg bg-white`}
        >
          <RichTextViewer editorState={story ? story.text : undefined} />
        </div>
      </div>
    </>
  );
};
export default ReadingPage;
