import { ACCEPTED_ROUTES } from '../routes/routes.tsx';
import { CTAButton } from '../components/CTAButton/CTAButton.tsx';
import { Text } from '../components/Text/Text.tsx';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo/Logo.tsx';
import mockUpImage from '../images/mock-up.jpg';
import StoryCard from '../components/StoryCard/StoryCard.tsx';
import { supabase } from '../supabase/index.ts';
import { useState, useEffect } from 'react';

type story = {
  id: number;
  name: string;
  image_path?: string;
  user_id: string;
  published: boolean;
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [featuredStories, setFeaturedStories] = useState<story[]>([]);
  const [selectedStory, setSelectedStory] = useState<any>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    if (selectedStory) {
      navigate(ACCEPTED_ROUTES.READER, {
        replace: true,
        state: {
          selectedStory: selectedStory,
        },
      });
    }
  }, [selectedStory]);

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('published', true)
      .limit(5);
    if (error) console.log(error);
    else setFeaturedStories([...data]);
  };

  return (
    <>
      <div className="bg-gradient-to-b from-[#5179D9] to-[#0F172A] h-screen fixed w-full top-0 -z-10"></div>
      <div className="] flex flex-col gap-[100px] justify-center items-center cursor-default overflow-x-hidden">
        <section
          id="LandingPageNavbar"
          className="absolute top-0 right-0 pt-3 pr-3"
        >
          <CTAButton
            title="Login"
            variant="landing"
            onClick={() => {
              navigate(ACCEPTED_ROUTES.LOGIN);
            }}
          />
        </section>
        <div className=" h-screen min-h-[750px] flex flex-col justify-end max-h-none">
          <section
            id="hero"
            className="flex flex-row  justify-center items-center   "
          >
            <Logo variant="big" />
            {/* <div
          id="logo"
          className="h-[200px] w-[133px] rounded-3xl border-2 border-black flex flex-col justify-center items-center"
        >
          <Text variant="logo" textColor="white" content="Codeck" />
        </div> */}
            <div className="w-[600px] h-[200px] text-left ml-[73px] pt-[30px] ">
              <Text
                variant="hero"
                textColor="white"
                content=" Unfold creativity and structure with card-based writing!"
              />
            </div>
          </section>

          <section className="flex flex-row h-[500px] gap-[25px] max-w-[1160px] mt-10">
            <div className="flex flex-col h-auto max-w-[497px] text-left gap-[36px] my-[35px] ">
              <Text
                variant="heroHeading2"
                textColor="white"
                content="Why Codeck?"
              />
              <Text
                variant="pSecondary"
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

            <div className="w-[600px] h-[428px] shadow-mockup rounded-[15px] ">
              <img
                src={mockUpImage}
                alt="mock-up"
                className="w-[100%] h-[100%] object-cover rounded-[15px]"
              />
            </div>
          </section>
        </div>

        <section className="max-w-[1160px] flex flex-row ">
          <div className="max-w-[1160px] text-left">
            <Text
              variant="heroHeading2"
              textColor="white"
              content="What is Codeck?"
            />
            <Text
              variant="pSecondary"
              textColor="white"
              content="Codeck is a web-based word processing service that redefines the art of writing by providing a dynamic platform where words and concise notes intertwine seamlessly. Unlike traditional word processors, Codeck empowers you to craft compelling narratives while using side-by-side cards for supplementary details. Whether you're a writer, student, or professional communicator, Codeck is your key to efficient and expressive writing, simplifying the process of conveying information and ideas."
            />
          </div>
        </section>

        <section id="StoryList" className="max-w-[1160px] h-[396px]">
          <div className="flex flex-row pb-10 w-[1160px] h-[56px]">
            <Text textColor="white" variant="heading2" content="Trending" />

            <div className="w-full h-0.5  bg-white mt-[27px]"></div>
          </div>

          <div className="flex flex-row justify-between w-full mt-[40px]">
            {featuredStories.map(story => {
              return (
                <StoryCard
                  key={story.id}
                  story={story}
                  author={true}
                  setSelectedStory={setSelectedStory}
                />
              );
            })}
          </div>
        </section>
        <section className="h-[125px]">
          <div className="w-screen h-0.5  bg-white "></div>

          <div className="flex flex-row justify-between mt-[40px] mx-[140px]">
            <div>
              <div className="w-[200px]">
                <Text
                  content="Contact us"
                  variant="heading2"
                  textColor="white"
                />
                <Text
                  content="Connect with us on Discord for inquiries, updates, and feedback. "
                  variant="pPrimary"
                  textColor="white"
                />
              </div>
            </div>
            <a
              href="https://discord.gg/gATY4m5kun"
              className="w-[40px] h-[40px] pt-0.5"
            >
              <div className="discord"></div>
            </a>
            <Text
              content="Copyright 2023"
              variant="heading2"
              textColor="white"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
