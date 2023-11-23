import { Input } from '../Input/Input';
import { supabase } from '../../supabase';
import { CTAButton } from '../CTAButton/CTAButton';
import { useState, useEffect } from 'react';
import { Text } from '../Text/Text';

interface StoryCardProps {
  story: {
    id: number;
    name: string;
    image_path?: string;
    user_id: string;
    published: boolean;
  };
  stories?: StoryCardProps['story'][];
  setStories?: Function;
  setChangeCardId?: Function;
  setSelectedStory: Function;
  deleteCard?: Function;
  changePicture?: Function;
  author?: boolean | 'always';
}

const StoryCard = (props: StoryCardProps) => {
  //can you make me a solution to see if card is hovered over and then show the delete button
  const [isHovered, setIsHovered] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [author, setAuthor] = useState<string>('');

  useEffect(() => {
    if (!props.author) return;
    supabase
      .from('users')
      .select('username')
      .eq('id', props.story.user_id)
      .single()
      .then(result => {
        setAuthor(result.data?.username);
      });
  }, []);

  useEffect(() => {
    if (!props.story.image_path) return;

    const result = supabase.storage
      .from('images')
      .getPublicUrl(props.story.image_path);
    setImageUrl(result.data.publicUrl);
  }, [props.story.image_path]);

  const publishStory = async () => {
    if (!props.setStories || !props.stories) {
      console.log('Missing props!');
      return;
    }
    const id = props.story.id;
    const { data, error } = await supabase
      .from('stories')
      .update({ published: !props.story.published })
      .eq('id', id)
      .select('published')
      .single();
    if (error) console.log(error);
    else {
      const updatedStories = props.stories;
      const storyIndex = updatedStories.findIndex(story => {
        if (story.id === props.story.id) return true;
        return false;
      });
      updatedStories[storyIndex].published = data.published;
      props.setStories([...updatedStories]);
    }
  };

  const changeName = async (newName: string) => {
    if (!props.stories || !props.setStories) {
      console.log('Missing stories props!');
      return;
    }
    const id = props.story.id;
    const { data, error } = await supabase
      .from('stories')
      .update({ name: newName })
      .eq('id', id);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      const index = props.stories.findIndex(story => {
        if (story.id === id) return true;
        return false;
      });
      const newStories = props.stories;
      newStories[index].name = newName;
      props.setStories([...newStories]);
    }

    // write your logic here for updating name of story
  };

  return (
    <div
      id={props.story.name}
      className={`  w-[200px] h-[300px] rounded-[10px] relative z-0 shadow-right-bottom bg-[#5179D9] cursor-pointer ${
        imageUrl ? '' : 'hover:border-2 hover:border-white'
      }`}
      onClick={() => {
        props.setSelectedStory(props.story);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="absolute -z-10 w-full h-full rounded-[10px] hover:border-2 hover:border-white"
          draggable="false"
        />
      )}
      <div
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {props.deleteCard !== undefined &&
          props.changePicture !== undefined &&
          props.setChangeCardId !== undefined && (
            <div className="h-[42px] flex flex-row justify-end gap-2 pr-2 pt-2">
              {isHovered && (
                <CTAButton
                  variant="publishStory"
                  title={props.story.published ? 'Make private' : 'Make public'}
                  onClick={() => {
                    publishStory();
                  }}
                />
              )}

              {isHovered && (
                <CTAButton
                  variant="deleteCard"
                  title=""
                  // onClick={() => props.setChangeCardId(props.story)}
                  onClick={() => {
                    props.deleteCard !== undefined && props.deleteCard();
                    props.setChangeCardId !== undefined &&
                      props.setChangeCardId(props.story);
                    console.log(`Delete card id: ${props.story.name}`);
                  }}
                />
              )}
              {isHovered && (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                  }}
                >
                  <input
                    className=" hidden"
                    id="file-upload"
                    type="file"
                    accept=" .png, .jpg, .gif"
                    name="image"
                    onChange={e => {
                      e.preventDefault();

                      if (e.target.files) {
                        if (e.target.files[0].size > 2097152) {
                          alert('File is too big!');
                          return;
                        }
                        props.changePicture !== undefined &&
                          props.changePicture(
                            props.story.id,
                            e.target.files[0],
                          );
                        // props.changePicture(props.story.id, image);
                      }
                    }}
                  />
                  <label htmlFor="file-upload">
                    <CTAButton
                      variant="changePicture"
                      title=""
                      onClick={() => {}}
                    />
                  </label>
                </form>
              )}
            </div>
          )}

        {props.deleteCard !== undefined &&
          props.changePicture !== undefined &&
          props.setChangeCardId !== undefined && (
            <div className="">
              <Input
                id={props.story.id.toString()}
                variant="cardTitle"
                placeholder={props.story.name}
                onChange={() => {}}
                type="text"
                onBlur={e => {
                  const newName = e.target.value;

                  changeName(newName);
                }}
              />
            </div>
          )}
      </div>

      {props.deleteCard === undefined &&
        props.changePicture === undefined &&
        props.setChangeCardId === undefined && (
          <div className=" flex justify-center items-center pt-[42px]">
            {/* <div className="w-[150px] bg-black bg-opacity-60 rounded-lg p-3">
              <Text
                content={props.story.name}
                textColor="white"
                variant="cardTitle"
              />
            </div> */}
            <div className=" h-auto min-h-[40px] break-words w-[150px] bg-black bg-opacity-60 rounded-[10px] flex justify-center items-center px-1">
              <Text
                content={props.story.name}
                textColor="white"
                variant="heading4"
              />
            </div>
          </div>
        )}

      {((props.author && isHovered) || props.author === 'always') && (
        <div className="absolute bottom-0 flex items-center text-left w-full pl-2 rounded-b-[8px] bg-black bg-opacity-40 h-8 ">
          <Text
            content={`Author: ${author}`}
            textColor="white"
            variant="pPrimary"
          />
        </div>
      )}
    </div>
  );
};
export default StoryCard;
