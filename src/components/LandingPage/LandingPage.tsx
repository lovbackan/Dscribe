import { CTAButton } from '../CTAButton/CTAButton';
import { CardDesign } from '../Card/CardDesign';
import { Input } from '../Input/Input.tsx';

interface LandingPageProps {
  setView: Function;
}

const LandingPage = (props: LandingPageProps) => {
  return (
    <div className="h-screen">
      <section
        id="LandingPageNavbar"
        className=" flex justify-between h-14 w-full bg-slate-400 items-center"
      >
        <h3 className="text-3xl text-white">Codeck</h3>
        <CTAButton
          title="Sign in"
          variant="landing"
          onClick={() => {
            console.log('Sign in button clicked');
            props.setView('login');
          }}
        />
      </section>
      <section
        id="searchBar"
        className="flex flex-col justify-center items-center mt-28"
      >
        <h4 className="text-3xl text-black">
          Your card-based authoring platform
        </h4>
        {/* Set search function here */}
        <Input
          placeholder="Search for stories"
          variant="landing"
          onChange={e => {
            console.log(e.target.value);
          }}
        />
      </section>

      <section id="StoryList" className="w-full h-[30%] px-5">
        <div className="">
          <h4 className="text-3xl text-black text-left ">Trending</h4>
        </div>

        {/* Add published works here 
        Add dynamic titles
        and onclick*/}

        <div className="flex flex-row justify-between">
          <CardDesign
            title="The Great Gatsby"
            variant="bigCard"
            onClick={() => console.log('The Great Gatsby clicked')}
          />
          <CardDesign
            title="Lord of the rings"
            variant="bigCard"
            onClick={() => console.log('Lord of the rings clicked')}
          />
          <CardDesign
            title="The Great Gatsby"
            variant="bigCard"
            onClick={() => console.log('The Great Gatsby clicked')}
          />
          <CardDesign
            title="The Great Gatsby"
            variant="bigCard"
            onClick={() => console.log('The Great Gatsby clicked')}
          />
          <CardDesign
            title="The Great Gatsby"
            variant="bigCard"
            onClick={() => console.log('The Great Gatsby clicked')}
          />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
