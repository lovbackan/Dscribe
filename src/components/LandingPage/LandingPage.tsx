import { CTAButton } from '../CTAButton/CTAButton';

interface LandingPageProps {
  setView: Function;
}

const LandingPage = (props: LandingPageProps) => {
  return (
    <div>
      <h1>Landing Page</h1>
      <CTAButton
        title="Sign in"
        variant="primary"
        onClick={() => {
          console.log('Sign in button clicked');
          props.setView('login');
        }}
      />
    </div>
  );
};

export default LandingPage;
