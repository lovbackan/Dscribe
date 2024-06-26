import { SupabaseClient } from '@supabase/supabase-js';
import StoryCard from '../StoryCard/StoryCard';
import { Text } from '../Text/Text';

interface StoryListProps {
  stories: Array<any>;
  setStories: Function;
  setSelectedStory: Function;
  setChangeCardId?: Function;
  supabase: SupabaseClient;
  deleteCard?: Function;
  changePicture?: Function;
  author?: boolean;
  addStory?: boolean;
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
      props.setStories([data, ...props.stories]);
    }
  };

  return (
    <>
      {props.addStory && (
        <div
          className="w-[200px] h-[300px] rounded-[10px] bg-[#223154]  cursor-pointer hover:border-4  text-black flex justify-center items-center border-2 border-white"
          onClick={() => addStory()}
        >
          <div>
            <Text variant="heading2" textColor="white" content="+" />
            {/* <h2 className="text-white text-[30px] flex justify-center items-center">
            +
          </h2> */}
          </div>
        </div>
      )}
      {props.stories.map(story => {
        // console.log(story);
        return (
          <StoryCard
            key={story.id}
            story={story}
            stories={props.stories}
            setStories={props.setStories}
            setSelectedStory={props.setSelectedStory}
            setChangeCardId={props.setChangeCardId}
            deleteCard={props.deleteCard}
            changePicture={props.changePicture}
            author={props.author}
          />
        );
      })}
    </>
  );
};

export default StoryList;
