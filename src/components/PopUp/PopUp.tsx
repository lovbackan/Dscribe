import { Text } from '../Text/Text';
import { CTAButton } from '../CTAButton/CTAButton';
type PopUptypes = 'logOut' | 'deleteStory';

interface PopUpProps {
  variant: PopUptypes;
  action: Function;
  changeCardId?: any;
  cancel: Function;
}

const PopUp: React.FC<PopUpProps> = ({
  variant,
  action,
  cancel,
  changeCardId,
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
  }
};
export default PopUp;
