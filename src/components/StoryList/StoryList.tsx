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
    <div className="flex flex-wrap w-full justify-center gap-5 pl-[200px] max-w-[90%]">
      {props.stories.map(story => {
        // console.log(story);
        return (
          <StoryCard
            key={story.id}
            story={story}
            setSelectedStory={props.setSelectedStory}
          />
        );
      })}

      <div
        className="w-[200px] h-[300px] rounded-[20px] bg-white cursor-pointer hover:border hover:border-black text-black flex justify-center items-center border-8 border-slate-300"
        onClick={() => addStory()}
      >
        <h2 className="text-black text-[64px] flex justify-center items-center">
          +
        </h2>
      </div>
    </div>
  );
};

export default StoryList;
