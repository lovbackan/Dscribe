import Navbar from '../components/Navbar/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCEPTED_ROUTES } from '../routes/routes';
import { supabase } from '../supabase';
import { CTAButton } from '../components/CTAButton/CTAButton';

const CommunityPage = () => {
  const [showSignOutPopup, setShowSignOutPopup] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    const result = await supabase.auth.signOut();
    if (result.error) {
      console.log(result.error);
    } else {
      setShowSignOutPopup(false); // Close the popup after sign out
      navigate(ACCEPTED_ROUTES.LANDING);
      console.log('signed out');
    }
  };

  if (showSignOutPopup) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-[#5179D9] to-[#0F172A]">
      <Navbar
        onClick={() => {
          setShowSignOutPopup(true);
        }}
      />
      <h1>Community Page</h1>

      {showSignOutPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-8 rounded-lg z-10 h-[300px] w-[500px] flex-col justify-center items-center">
          <h2>Are you sure</h2>
          <div className="flex flex-row justify-between">
            <CTAButton
              title="Sign out"
              variant="primary"
              onClick={handleSignOut}
            />
            <CTAButton
              title="Cancel"
              variant="secondary"
              onClick={() => setShowSignOutPopup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default CommunityPage;
