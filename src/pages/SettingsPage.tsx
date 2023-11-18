import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import PopUp from '../components/PopUp/PopUp';
import { useNavigate } from 'react-router-dom';
import { ACCEPTED_ROUTES } from '../routes/routes';
import { supabase } from '../supabase';
import { Text } from '../components/Text/Text';
import { Input } from '../components/Input/Input';
import { CTAButton } from '../components/CTAButton/CTAButton';

const SettingsPage = () => {
  const [showSignOutPopup, setShowSignOutPopup] = useState(false);
  const [showChangeUsernamePopup, setShowChangeUsernamePopup] = useState(false);
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
  const [showRemoveAccountPopup, setShowRemoveAccountPopup] = useState(false);

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
          setShowChangePasswordPopup(false);
          setShowChangeUsernamePopup(false);
          setShowRemoveAccountPopup(false);
        }}
      />
      <div
        id="search-bar"
        className="flex flex-col w-[500px] text-left pl-[212px] pt-[40px] gap-6 pb-[90px]"
      >
        <Text variant="heading1" textColor="white" content="Settings" />
        <Input
          type="text"
          id="search"
          autoComplete="off"
          placeholder="Search"
          variant="secondary"
          autoFocus={true}
          onChange={e => {
            console.log(e.target.value);
          }}
        />
      </div>

      <div className="pl-[212px] text-left pb-[80px] gap-[20px] flex flex-col">
        <Text variant="heading3" textColor="white" content="Username" />
        <CTAButton
          title="Change username"
          variant="secondary"
          onClick={() => {
            setShowChangeUsernamePopup(true);
            setShowSignOutPopup(false);
            setShowChangePasswordPopup(false);
            setShowRemoveAccountPopup(false);
          }}
        />
      </div>

      <div className="pl-[212px] text-left pb-[80px] gap-[20px] flex flex-col">
        <Text variant="heading3" textColor="white" content="Password" />
        <CTAButton
          title="Change password"
          variant="secondary"
          onClick={() => {
            setShowChangePasswordPopup(true);
            setShowSignOutPopup(false);
            setShowChangeUsernamePopup(false);
            setShowRemoveAccountPopup(false);
          }}
        />
      </div>

      <div className="pl-[212px] text-left pb-[80px] gap-[20px] flex flex-col">
        <Text variant="heading3" textColor="white" content="Account" />
        <CTAButton
          title="Remove account"
          variant="secondary"
          onClick={() => {
            setShowRemoveAccountPopup(true);
            setShowSignOutPopup(false);
            setShowChangePasswordPopup(false);
            setShowChangeUsernamePopup(false);
          }}
        />
      </div>
      {showRemoveAccountPopup && (
        <PopUp
          variant="deleteAccount"
          action={() => {
            console.log('Delete account');
          }}
          cancel={() => {
            setShowRemoveAccountPopup(false);
          }}
        />
      )}
      {showChangePasswordPopup && (
        <PopUp
          variant="changePassword"
          action={() => {
            console.log('change Password');
          }}
          cancel={() => {
            setShowChangePasswordPopup(false);
          }}
        />
      )}
      {showChangeUsernamePopup && (
        <PopUp
          variant="changeUsername"
          action={() => {
            console.log('change username');
          }}
          cancel={() => {
            setShowChangeUsernamePopup(false);
          }}
        />
      )}
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
