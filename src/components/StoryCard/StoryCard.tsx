import { Input } from '../Input/Input';
import { supabase } from '../../supabase';

interface StoryCardProps {
  story: { id: number; name: string };
  setSelectedStory: Function;
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
  const changeName = async (newName: string) => {
    const id = props.story.id;
    console.log(id, newName);
    const result = await supabase
      .from('stories')
      .update({ name: newName })
      .eq('id', id);
    // if (error) {
    //   console.log(error);
    // }
    console.log(result);

    // write your logic here for updating name of story
  };

  return (
    <div
      className="  w-[200px] h-[300px] rounded-[20px] bg-slate-300 cursor-pointer hover:border hover:border-white"
      onClick={() => props.setSelectedStory(props.story)}
    >
      <div
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Input
          id={props.story.id.toString()}
          variant="cardTitle"
          placeholder={props.story.name}
          onChange={() => {}}
          type="text"
          onBlur={e => {
            const newName = e.target.value;

            changeName(newName);

            //write logic to update story name
            // console.log(e.target.value);
          }}
        />
      </div>
      {/* <h2 className="text-black">Story: {props.story.id}</h2> */}
    </div>
  );
};
export default StoryCard;
