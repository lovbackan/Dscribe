import { useEffect, useState } from 'react';
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
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const fetchUser = async () => {
    let { data, error } = await supabase.auth.getUser();
    const userId = data.user?.id;
    console.log(data);
    const result = await supabase
      .from('users')
      .select('username')
      .eq('id', userId)
      .single();

    if (error) console.log(error);
    else setUsername(result.data?.username);
    console.log(result.data?.username);
  };

  const changeUsername = async () => {
    //This isn't 100% safe. Should create a custom change password function on Supabase that incorporates this.
    const passResult = await supabase.rpc('verify_user_password', {
      password: oldPassword,
    });
    if (passResult.error || !passResult.data) {
      alert('Wrong password!');
      return;
    }

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;
    const result = await supabase
      .from('users')
      .update({ username: newUsername })
      .eq('id', user.id);
    setOldPassword('');
    setShowChangeUsernamePopup(false);
    if (result.error) {
      alert('Username already exists');
      return;
    }
  };

  const changePassword = async () => {
    const passResult = await supabase.rpc('verify_user_password', {
      password: oldPassword,
    });
    if (passResult.error || !passResult.data) {
      alert('Wrong password!');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert('Sorry you did not write the same password twice');
      return;
    } else if (newPassword === '') {
      alert('Password cannot be empty');
      return;
    } else if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    } else if (newPassword.length > 72) {
      alert('Password must be less than 72 characters long');
      return;
    } else if (newPassword.includes(' ')) {
      alert('Password cannot contain spaces');
      return;
    } else if (!/\d/.test(newPassword)) {
      alert('Password must contain at least one number');
      return;
    }

    await supabase.auth.updateUser({ password: newPassword });
    alert('Password changed');
    setShowChangePasswordPopup(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

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

  // if (showSignOutPopup) {
  //   document.body.style.overflow = 'hidden';
  // } else {
  //   document.body.style.overflow = 'auto';
  // }

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#5179D9] to-[#0F172A]">
      <div
        className={`${
          showSignOutPopup ||
          showChangePasswordPopup ||
          showChangeUsernamePopup ||
          showRemoveAccountPopup
            ? 'opacity-40  '
            : 'opacity-100'
        }`}
      >
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
            changePassword();
          }}
          cancel={() => {
            setShowChangePasswordPopup(false);
          }}
          onChange1={e => {
            setNewPassword(e.target.value);
          }}
          onChange2={e => {
            setConfirmNewPassword(e.target.value);
          }}
          onChange3={e => {
            setOldPassword(e.target.value);
          }}
        />
      )}
      {showChangeUsernamePopup && (
        <PopUp
          variant="changeUsername"
          action={() => {
            // add check if password is correct
            if (newUsername === '') {
              alert('Username cannot be empty');
              return;
            }

            if (newUsername !== '' && newUsername !== username) {
              changeUsername();
              setShowChangeUsernamePopup(false);
            }
          }}
          cancel={() => {
            setShowChangeUsernamePopup(false);
          }}
          onChange1={e => {
            setNewUsername(e.target.value);
          }}
          onChange2={e => {
            setOldPassword(e.target.value);
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
