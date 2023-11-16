import { ACCEPTED_ROUTES } from '../routes/routes.tsx';
import { CTAButton } from '../components/CTAButton/CTAButton.tsx';
import { Text } from '../components/Text/Text.tsx';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo/Logo.tsx';
import mockUpImage from '../images/mock-up.jpg';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-screen bg-gradient-to-b from-[#5179D9] to-[#0F172A]">
      <section
        id="LandingPageNavbar"
        className="h-[101px] w-full bg-inherit flex flex-row justify-center items-center px-[20px]"
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

      <section
        id="hero"
        className="flex flex-row justify-center items-center  "
      >
        <Logo variant="big" />
        {/* <div
          id="logo"
          className="h-[200px] w-[133px] rounded-3xl border-2 border-black flex flex-col justify-center items-center"
        >
          <Text variant="logo" textColor="white" content="Codeck" />
        </div> */}
        <div className="w-[661px] h-[200px] text-left ml-[73px]">
          <Text
            variant="hero"
            textColor="white"
            content=" Unfold creativity and structure with card-based writing!"
          />
        </div>
      </section>

      <section className="flex flex-row">
        <div className="flex flex-col w-[445px]">
          <Text variant="logoBig" textColor="white" content="Why Codeck?" />
          <Text
            variant="p-primary"
            textColor="white"
            content="Unlock a new dimension in writing. Seamlessly blend your main text with card-based notes, ensuring clarity without the clutter. Tailor your narrative effortlessly, whether you're drafting documents, crafting stories, or enhancing your communication. Codeck empowers you to express more, with precision and ease!"
          />
          <CTAButton
            title="Get started today!"
            variant="landing2"
            onClick={() => {
              navigate(ACCEPTED_ROUTES.LOGIN);
            }}
          />
        </div>

        <div className="w-[445px] ">
          <img
            src={mockUpImage}
            alt="mock-up"
            className="w-[100%] h-[100%] object-cover"
          />
        </div>
      </section>

      <section>
        <div className="w-[800px]">
          <Text variant="logoBig" textColor="white" content="What is Codeck?" />
          <Text
            variant="p-primary"
            textColor="white"
            content="Codeck is a web-base word processing service that redefines the art of writing by providing a dynamic platform where words and concise notes intertwine seamlessly. Unlike tradtional word processors, Codeck empowers you to craft comeplling narratives while using side-by-side cards for supplementary details. Whether you're a writer, student, or professional comunicator, Codeck is your key to efficient and expressive writing, simplifying the process of conveying informations and ideas."
          />
        </div>
      </section>

      {/* <section id="StoryList" className="w-full h-[30%] px-[140px] ">
        <div className="flex flex-row pb-10">
          <Text textColor="white" variant="heading2" content="Trending" />

          <div className="w-full h-0.5 bg-white self-end"></div>
        </div>

        <div className="flex flex-row justify-between w-[80%]">
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
      </section> */}
    </div>
  );
};

export default LandingPage;
