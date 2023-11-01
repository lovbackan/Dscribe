import { CTAButton } from '../CTAButton/CTAButton';
import { CardDesign } from '../Card/CardDesign';
import { Input } from '../Input/Input.tsx';
import { Text } from '../Text/Text.tsx';

interface LandingPageProps {
  setView: Function;
}

const LandingPage = (props: LandingPageProps) => {
  return (
    <div className="h-screen bg-black">
      <section
        id="LandingPageNavbar"
        className="h-14 w-full bg-slate-400 flex flex-row"
      >
        <div className="flex-grow"></div>
        <CTAButton
          title="Log in"
          variant="landing"
          onClick={() => {
            console.log('Sign in button clicked');
            props.setView('login');
          }}
        />
      </section>

      <section id="hero" className="flex flex-row justify-center items-center">
        {/* put logo here */}

        <Text
          variant="heading1"
          textColor="green"
          content=" Unfold creativity and structure with
          card-based literacy!"
        />
      </section>

      {/* <section
        id="searchBar"
        className="flex flex-col justify-center items-center mt-28"
      >
        <Text
          variant="heading1"
          content=" Unfold creativity and structure with
          card-based literacy!"
        />

        
        <Input
          placeholder="Search for stories"
          variant="landing"
          onChange={e => {
            console.log(e.target.value);
          }}
        />
      </section> */}

      <section id="StoryList" className="w-full h-[30%] px-5 ">
        <div className="flex flex-row pb-10">
          <Text textColor="green" variant="heading2" content="Trending" />

          <div className="w-full h-0.5 bg-green-700 self-end"></div>
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
