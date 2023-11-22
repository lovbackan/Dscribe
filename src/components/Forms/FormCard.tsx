import Logo from '../Logo/Logo';
import { useState, useEffect } from 'react';
interface FormCardProps {
  formComponent: React.ReactNode;
  animate?: boolean;
}

const FormCard: React.FC<FormCardProps> = props => {
  const [outerAnimation, setOuterAnimation] = useState('translate-y-[70vh]');
  const [innerAnimation, setInnerAnimation] = useState('opacity-0');
  useEffect(() => {
    setOuterAnimation('translate-y-0');
    setInnerAnimation('opacity-100');
  }, []);
  const { formComponent } = props;
  return (
    <div
      id="outerContainer"
      className={`w-[690px] h-[300px] rounded-[20px] flex-row bg-inherit flex  ${
        props.animate ? 'transition-transform' : 'transition-none'
      } delay-300 duration-1000 ${outerAnimation}`}
    >
      <Logo variant={props.animate ? 'loginAnimate' : 'login'} />

      <div
        id="infoContainer"
        className={`w-[510px] ${innerAnimation} h-full rounded-r-[20px] bg-inherit flex  items-center flex-col pl-10 -ml-5   border-y-2 border-e-2 border-white   ${
          props.animate ? 'transition-all' : 'transition-none'
        } delay-1000 duration-1000`}
      >
        {formComponent}
      </div>
      <div className="translate-y-0 opacity-100 opacity-0"></div>
    </div>
  );
};

export default FormCard;
