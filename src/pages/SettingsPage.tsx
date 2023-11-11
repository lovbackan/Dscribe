import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import PopUp from '../components/PopUp/PopUp';
import { useNavigate } from 'react-router-dom';
import { ACCEPTED_ROUTES } from '../routes/routes';
import { supabase } from '../supabase';

const SettingsPage = () => {
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
    <div className="h-screen w-screen bg-gradient-to-b from-[#5179D9] to-[#0F172A]">
      <Navbar
        onClick={() => {
          setShowSignOutPopup(true);
        }}
      />
      <h1>Settings Page</h1>

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
export default SettingsPage;
