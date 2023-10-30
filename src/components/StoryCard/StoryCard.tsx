interface StoryCardProps {
  story: { id: number };
  setSelectedStory: Function;
}

const StoryCard = (props: StoryCardProps) => {
  return (
    <div
      className="  w-[200px] h-[300px] rounded-[20px] bg-slate-300 cursor-pointer hover:border hover:border-white"
      onClick={() => props.setSelectedStory(props.story)}
    >
      <h2 className="text-black">Story: {props.story.id}</h2>
    </div>
  );
};
export default StoryCard;
