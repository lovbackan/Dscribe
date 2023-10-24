import { SupabaseClient } from '@supabase/supabase-js';
import StoryCard from '../StoryCard/StoryCard';

interface StoryListProps {
  stories: Array<any>;
  setStories: Function;
  setSelectedStory: Function;
  supabase: SupabaseClient;
}

const StoryList = (props: StoryListProps) => {
  //Mostly testing database interactions. Works fine but values are hardcoded.
  const addStory = async () => {
    const insertData = {
      user_id: (await props.supabase.auth.getUser()).data.user?.id,
      name: 'Gundi',
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
      <h1>Your Stories:</h1>
      <div className="flex flex-wrap w-full justify-center gap-5">
        {props.stories.map(story => {
          return (
            <StoryCard
              key={story.id}
              story={story}
              setSelectedStory={props.setSelectedStory}
            />
          );
        })}

        <div className="w-40 bg-black" onClick={() => addStory()}>
          New story!
        </div>
      </div>
    </>
  );
};

export default StoryList;
