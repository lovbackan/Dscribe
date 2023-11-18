import { Input } from '../Input/Input';
import { supabase } from '../../supabase';
import { CTAButton } from '../CTAButton/CTAButton';
import { useState, useEffect } from 'react';

interface StoryCardProps {
  story: { id: number; name: string; image_path?: string };
  setChangeCardId?: Function;
  setSelectedStory: Function;
  deleteCard?: Function;
  changePicture?: Function;
}

{
  /* <Input
              id="CardTitle"
              variant="cardTitle"
              placeholder={props.card.name}
              onChange={() => {}}
              onBlur={e => {
                const newName = e.target.value;
                const cardIndex = props.deck.findIndex(deckCard => {
                  if (props.card.id === deckCard.id) return true;
                  return false;
                });
                const newDeck = props.deck;
                newDeck[cardIndex].name = newName;
                if (
                  props.deck[cardIndex] === newName ||
                  !props.deckChanges ||
                  !props.setDeckChanges
                )
                  return;

                const newDeckChanges = props.deckChanges;
                const cardChangesIndex = newDeckChanges?.findIndex(deckCard => {
                  if (props.card.id === deckCard.id) return true;
                  return false;
                });
                console.log('Preupdate');
                if (cardChangesIndex === -1) {
                  console.log('Updateis');
                  newDeckChanges?.push({
                    id: props.card.id,
                    name: newName,
                  });
                } else {
                  newDeckChanges[cardChangesIndex].name = newName;
                }
                props.setDeck([...newDeck]);
                props.setDeckChanges([...newDeckChanges]);
              }}
              type="text"
            /> */
}

const StoryCard = (props: StoryCardProps) => {
  //can you make me a solution to see if card is hovered over and then show the delete button
  const [isHovered, setIsHovered] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!props.story.image_path) return;

    const result = supabase.storage
      .from('images')
      .getPublicUrl(props.story.image_path);
    setImageUrl(result.data.publicUrl);
  }, [props.story.image_path]);

  const publishStory = async () => {
    const id = props.story.id;
    const { error } = await supabase
      .from('stories')
      .update({ published: true })
      .eq('id', id);
    if (error) console.log(error);
  };

  const changeName = async (newName: string) => {
    const id = props.story.id;
    const { data, error } = await supabase
      .from('stories')
      .update({ name: newName })
      .eq('id', id);
    if (error) {
      console.log(error);
    }
    console.log(data);

    // write your logic here for updating name of story
  };

  return (
    <div
      id={props.story.name}
      className={`  w-[200px] h-[300px] rounded-[20px] bg-[#5179D9] cursor-pointer  drop-shadow-lg ${
        imageUrl ? '' : 'hover:border-2 hover:border-white'
      }`}
      onClick={() => props.setSelectedStory(props.story)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="absolute -z-10 w-full h-full rounded-xl hover:border-2 hover:border-white"
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
                  title="Make public"
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
      </div>
      {/* <h2 className="text-black">Story: {props.story.id}</h2> */}
    </div>
  );
};
export default StoryCard;
