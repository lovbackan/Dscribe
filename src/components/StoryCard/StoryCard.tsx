interface StoryCardProps {
  story: { id: number };
  setSelectedStory: Function;
}

const StoryCard = (props: StoryCardProps) => {
  return (
    <div
      className=" bg-black w-24 h-48"
      onClick={() => props.setSelectedStory(props.story)}
    >
      <h2>Story: {props.story.id}</h2>
    </div>
  );
};
export default StoryCard;
