import { Input } from '../Input/Input';
import { supabase } from '../../supabase';
import { CTAButton } from '../CTAButton/CTAButton';
import { useState } from 'react';

interface StoryCardProps {
  story: { id: number; name: string };
  setChangeCardId: Function;
  setSelectedStory: Function;
  deleteCard: Function;
  changePicture: Function;
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

  const changeName = async (newName: string) => {
    const id = props.story.id;
    console.log(id, newName);
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
      className="  w-[200px] h-[300px] rounded-[20px] bg-[#5179D9] cursor-pointer hover:border hover:border-white drop-shadow-lg"
      onClick={() => props.setSelectedStory(props.story)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className="h-[42px] flex flex-row justify-end gap-2 pr-2 pt-2">
          {isHovered && (
            <CTAButton
              variant="deleteCard"
              title=""
              // onClick={() => props.setChangeCardId(props.story)}
              onClick={() => {
                props.deleteCard();
                props.setChangeCardId(props.story);
                console.log(`Delete card id: ${props.story.name} `);
              }}
            />
          )}
          {isHovered && (
            <CTAButton
              variant="changePicture"
              title=""
              onClick={() => {
                // props.setSelectedStory(props.story);
                // props.setChangeCardId(props.story.id);
                // props.changePicture();
                console.log(`Change card picture id: ${props.story.id} `);
              }}
            />
          )}
        </div>

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
