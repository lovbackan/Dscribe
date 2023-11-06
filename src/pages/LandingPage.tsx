import { ACCEPTED_ROUTES } from '../routes/routes.tsx';
import { CTAButton } from '../components/CTAButton/CTAButton.tsx';
import { CardDesign } from '../components/Card/CardDesign.tsx';
import { Text } from '../components/Text/Text.tsx';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#852158] to-[#FFFDD6]">
      <section
        id="LandingPageNavbar"
        className="h-14 w-full bg-inherit flex flex-row"
      >
        <div className="flex-grow "></div>
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
          <Text variant="logo" textColor="white" content="Codeck" />
        </div>

        <Text
          variant="heading1Bold"
          textColor="white"
          content=" Unfold creativity and structure with
          card-based literacy!"
        />
      </section>

      <section id="StoryList" className="w-full h-[30%] px-5 ">
        <div className="flex flex-row pb-10">
          <Text textColor="white" variant="heading2" content="Trending" />

          <div className="w-full h-0.5 bg-white self-end"></div>
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
