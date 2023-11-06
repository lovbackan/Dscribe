import { Text } from '../Text/Text';
interface FormCardProps {
  formComponent: React.ReactNode;
}

const FormCard: React.FC<FormCardProps> = props => {
  const { formComponent } = props;
  return (
    <div
      id="outerContainer"
      className="w-[690px] h-[300px] rounded-[20px] flex-row bg-cyan-200 flex"
    >
      <div
        id="logoContainer"
        className="w-[200px] h-full rounded-[20px] bg-slate-500 flex justify-center items-center"
      >
        <Text variant="heading2" textColor="black" content="Codeck" />
      </div>
      <div
        id="infoContainer"
        className="w-[490px] h-full rounded-r-[20px] bg-slate-400 flex justify-center items-center flex-col"
      >
        {formComponent}
      </div>
    </div>
  );
};

export default FormCard;
