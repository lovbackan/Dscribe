import { SupabaseClient } from '@supabase/supabase-js';

interface StoriesContainerProps {
  stories: Array<any>;
  supabase: SupabaseClient;
  setStories: Function;
}

const StoriesContainer = (props: StoriesContainerProps) => {
  const removeStory = async (id: number) => {
    const result = await props.supabase
      .from('stories')
      .delete()
      .match({ id: id });
    if (result.error) console.log(result.error);
    else {
      const updatedStories = props.stories;
      const idToRemove = updatedStories.findIndex(story => {
        if (story.id === id) return true;
        return false;
      });
      updatedStories.splice(idToRemove, 1);
      props.setStories([...updatedStories]);
    }
  };

  return (
    <>
      {props.stories.map(story => {
        return (
          <div key={story.id}>
            A story! ID: {story.id}
            <button className="bg-black" onClick={() => removeStory(story.id)}>
              Remove!
            </button>
          </div>
        );
      })}
    </>
  );
};
export default StoriesContainer;
