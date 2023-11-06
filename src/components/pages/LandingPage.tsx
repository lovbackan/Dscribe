import { ACCEPTED_ROUTES } from '../../routes/routes.tsx';
import { CTAButton } from '../CTAButton/CTAButton';
import { CardDesign } from '../Card/CardDesign';
import { Text } from '../Text/Text.tsx';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-amber-50">
      <section
        id="LandingPageNavbar"
        className="h-14 w-full bg-slate-400 flex flex-row"
      >
        <div className="flex-grow"></div>
        <CTAButton
          title="Log in"
          variant="landing"
          onClick={() => {
            navigate(ACCEPTED_ROUTES.LOGIN);
          }}
        />
      </section>

      <section id="hero" className="flex flex-row justify-center items-center ">
        <div
          id="logo"
          className="h-[200px] w-[133px] rounded-3xl border-2 border-black flex flex-col justify-center items-center"
        >
          <Text variant="logo" textColor="black" content="Codeck" />
        </div>

        <Text
          variant="heading1Bold"
          textColor="black"
          content=" Unfold creativity and structure with
          card-based literacy!"
        />
      </section>

      <section id="StoryList" className="w-full h-[30%] px-5 ">
        <div className="flex flex-row pb-10">
          <Text textColor="black" variant="heading2" content="Trending" />

          <div className="w-full h-0.5 bg-black self-end"></div>
        </div>

        {/* Add published works here 
        Add dynamic titles
        and onclick to import all the content from the clicked story and redirect to readerview*/}

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
