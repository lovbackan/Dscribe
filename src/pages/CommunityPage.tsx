import Navbar from '../components/Navbar/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCEPTED_ROUTES } from '../routes/routes';
import { supabase } from '../supabase';
import PopUp from '../components/PopUp/PopUp';

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
        <PopUp
          variant="logOut"
          action={handleSignOut}
          cancel={() => {
            setShowSignOutPopup(false);
          }}
        />
      )}
    </div>
  );
};
export default CommunityPage;
