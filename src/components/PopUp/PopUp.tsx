import { Text } from '../Text/Text';
import { CTAButton } from '../CTAButton/CTAButton';
import { Input } from '../Input/Input';
type PopUptypes =
  | 'logOut'
  | 'deleteStory'
  | 'deleteCard'
  | 'changeUsername'
  | 'changePassword'
  | 'deleteAccount';

interface PopUpProps {
  variant: PopUptypes;
  action: Function;
  changeCardId?: any;
  cancel: Function;
  onChange1?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange2?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange3?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PopUp: React.FC<PopUpProps> = ({
  variant,
  action,
  cancel,
  changeCardId,
  onChange1,
  onChange2,
  onChange3,
}) => {
  if (variant === 'logOut') {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-8 rounded-lg z-10 h-[200px] w-[300px] flex-col justify-center items-center">
        <Text
          variant="heading2"
          textColor="white"
          content={`Are you sure you want to logout`}
        />
        {/* if u change the name of a story and try to delete it the old name will show up */}

        <div className="flex flex-row justify-between">
          <CTAButton
            title="Yes"
            variant="primary"
            onClick={() => {
              action();
            }}
          />
          <CTAButton
            title="No"
            variant="primary"
            onClick={() => {
              cancel();
            }}
          />
        </div>
      </div>
    );
  } else if (variant === 'deleteStory') {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-8 rounded-lg z-10 h-[200px] w-[300px] flex-col justify-center items-center">
        <Text
          variant="heading3"
          textColor="white"
          content={`Are you sure you want to delete story:`}
        />
        {/* if u change the name of a story and try to delete it the old name will show up */}
        <Text
          variant="heading2"
          textColor="white"
          content={`  ${changeCardId}`}
        />
        <div className="flex flex-row justify-between">
          <CTAButton
            title="Yes"
            variant="primary"
            onClick={() => {
              action();
            }}
          />
          <CTAButton title="No" variant="primary" onClick={() => cancel()} />
        </div>
      </div>
    );
  } else if (variant === 'deleteCard') {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-8 rounded-lg z-10 h-[200px] w-[300px] flex-col justify-center items-center">
        <Text
          variant="heading3"
          textColor="white"
          content={`Are you sure you want to delete Card`}
        />
        {/* if u change the name of a story and try to delete it the old name will show up */}
        <Text
          variant="heading2"
          textColor="white"
          content={`  ${changeCardId}`}
        />
        <div className="flex flex-row justify-between">
          <CTAButton
            title="Yes"
            variant="primary"
            onClick={() => {
              action();
            }}
          />
          <CTAButton title="No" variant="primary" onClick={() => cancel()} />
        </div>
      </div>
    );
  } else if (variant === 'changeUsername') {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-8 rounded-lg z-10 h-[300px] w-[400px] flex-col justify-center items-center">
        <Text
          variant="heading3"
          textColor="white"
          content={`Change Username`}
        />
        {/* if u change the name of a story and try to delete it the old name will show up */}
        <Input
          type="text"
          id="username"
          autoComplete="off"
          placeholder="New username"
          variant="secondary"
          autoFocus={true}
          onChange={onChange1 ? onChange1 : () => {}}
        />
        {onChange2 && (
          <Input
            type="password"
            id="password"
            variant="secondary"
            placeholder="Password"
            onChange={onChange2}
          />
        )}

        <div className="flex flex-row justify-between">
          <CTAButton
            title="Confirm"
            variant="primary"
            onClick={() => {
              action();
            }}
          />
          <CTAButton
            title="Cancel"
            variant="primary"
            onClick={() => cancel()}
          />
        </div>
      </div>
    );
  } else if (variant === 'changePassword') {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-8 rounded-lg z-10 h-[300px] w-[400px] flex-col justify-center items-center">
        <Text
          variant="heading3"
          textColor="white"
          content={`Change Password`}
        />
        {/* if u change the name of a story and try to delete it the old name will show up */}
        <Input
          type="password"
          id="newPassword"
          autoComplete="off"
          placeholder="New password"
          variant="secondary"
          autoFocus={true}
          onChange={onChange1 ? onChange1 : () => {}}
        />
        <Input
          type="password"
          id="confirmNewPassword"
          variant="secondary"
          placeholder="Confirm new password"
          onChange={onChange2 ? onChange2 : () => {}}
        />

        {onChange3 && (
          <Input
            type="password"
            id="password"
            variant="secondary"
            placeholder="Old Password"
            onChange={onChange3}
          />
        )}

        <div className="flex flex-row justify-between">
          <CTAButton
            title="Confirm"
            variant="primary"
            onClick={() => {
              action();
            }}
          />
          <CTAButton
            title="Cancel"
            variant="primary"
            onClick={() => cancel()}
          />
        </div>
      </div>
    );
  } else if (variant === 'deleteAccount') {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-8 rounded-lg z-10 h-[200px] w-[300px] flex-col justify-center items-center">
        <Text
          variant="heading3"
          textColor="white"
          content={`Are you sure you want to delete your account`}
        />
        <div className="flex flex-row justify-between">
          <CTAButton
            title="Yes"
            variant="primary"
            onClick={() => {
              action();
            }}
          />
          <CTAButton title="No" variant="primary" onClick={() => cancel()} />
        </div>
      </div>
    );
  }
};
export default PopUp;
