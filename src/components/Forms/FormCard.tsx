import { Text } from '../Text/Text';
import Logo from '../Logo/Logo';
interface FormCardProps {
  formComponent: React.ReactNode;
}

const FormCard: React.FC<FormCardProps> = props => {
  const { formComponent } = props;
  return (
    <div
      id="outerContainer"
      className="w-[690px] h-[300px] rounded-[20px] flex-row bg-inherit flex border-2 border-white"
    >
      <div
        id="logoContainer"
        className="w-[200px] h-full rounded-[20px] bg-inherit flex justify-center items-center border-white border-r-2"
      >
        <Text variant="logoBig" textColor="white" content="Codeck" />
      </div>
      <div
        id="infoContainer"
        className="w-[490px] h-full rounded-r-[20px] bg-inherit flex justify-center items-center flex-col"
      >
        {formComponent}
      </div>
    </div>
  );
};

export default FormCard;
