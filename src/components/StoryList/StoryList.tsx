import { SupabaseClient } from '@supabase/supabase-js';
import StoryCard from '../StoryCard/StoryCard';

interface StoryListProps {
  stories: Array<any>;
  setStories: Function;
  setSelectedStory: Function;
  setChangeCardId: Function;
  supabase: SupabaseClient;
  deleteCard: Function;
  changePicture: Function;
}

const StoryList = (props: StoryListProps) => {
  //Mostly testing database interactions. Works fine but values are hardcoded.
  const addStory = async () => {
    const insertData = {
      user_id: (await props.supabase.auth.getUser()).data.user?.id,
      name: 'New story',
    };
    const { data, error } = await props.supabase
      .from('stories')
      .insert(insertData)
      .select()
      .single();
    if (error) {
      console.log(error);
    } else {
      props.setStories([...props.stories, data]);
    }
  };

  return (
    <>
      {props.stories.map(story => {
        // console.log(story);
        return (
          <StoryCard
            key={story.id}
            story={story}
            setSelectedStory={props.setSelectedStory}
            setChangeCardId={props.setChangeCardId}
            deleteCard={props.deleteCard}
            changePicture={props.changePicture}
          />
        );
      })}

      <div
        className="w-[200px] h-[300px] rounded-[20px]  cursor-pointer hover:border-4  text-black flex justify-center items-center border-2 border-white"
        onClick={() => addStory()}
      >
        <h2 className="text-white text-[30px] flex justify-center items-center">
          +
        </h2>
      </div>
    </>
  );
};

export default StoryList;
