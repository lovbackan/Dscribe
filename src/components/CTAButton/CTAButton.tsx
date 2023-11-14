import React from 'react';
// import { Text } from '../Text/Text';
import { useState } from 'react';

type ButtonType =
  | 'primary'
  | 'secondary'
  | 'landing'
  | 'minimize/close'
  | 'cardCategory'
  | 'cardSubCategory'
  | 'deckViewCategory'
  | 'disabled'
  | 'deck'
  // | 'edit'
  | 'viewDeck'
  | 'addCard'
  | 'deleteCard'
  | 'changePicture';

interface CTAButtonProps {
  title: string | number;
  variant: ButtonType;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  removeSubCategory?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .
export const CTAButton: React.FC<CTAButtonProps> = ({
  title,
  onClick,
  variant,
  removeSubCategory,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerClasses =
    variant === 'primary'
      ? 'bg-white  h-[27px] w-[80px] rounded-[5px] flex justify-center items-center hover:border-black hover:border'
      : variant === 'secondary'
      ? 'bg-white border-black h-[27px] w-[139px] rounded-[5px] flex justify-center items-center hover:border-black hover:border'
      : variant === 'landing'
      ? 'w-[126px] h-[48px] border border-white rounded-[5px] flex justify-center items-center hover:border-2'
      : variant === 'cardCategory'
      ? 'bg-black h-4 min-w-[40px] w-auto rounded-tl-[5px] rounded-br-[5px] flex justify-center items-center hover:border-white hover:border'
      : variant === 'deckViewCategory'
      ? 'w-auto p-2 h-5 rounded-xl bg-black flex justify-center items-center hover:border-white hover:border'
      : variant === 'addCard'
      ? 'w-12 h-20 rounded-xl bg-white border-2 border-black flex justify-center items-center hover:border-green-700 hover:border-4'
      : // : variant === 'edit'
      // ? 'w-6 h-6 bg-white  flex justify-center items-center hover:border-black hover:border rounded '
      variant === 'minimize/close'
      ? 'w-[20px] h-[20px] rounded-[5px] flex justify-center items-center hover:border-black hover:border bg-white'
      : variant === 'cardSubCategory'
      ? 'w-auto h-[20px] rounded-[12px] bg-black flex justify-center items-center hover:border-white hover:border px-2'
      : variant === 'viewDeck'
      ? 'w-14 h-24 deck-icon'
      : variant === 'deleteCard'
      ? 'deleteCard hover:border-2 hover:border-white'
      : variant === 'changePicture'
      ? 'uploadPicture hover:border-2 hover:border-white'
      : 'bg-purple-400';

  const textClasses =
    variant === 'primary'
      ? 'text-black text-[12px]'
      : variant === 'secondary'
      ? 'text-black text-[12px]'
      : variant === 'landing'
      ? 'text-white text-3xl '
      : variant === 'cardCategory'
      ? 'text-white text-xs'
      : variant === 'deckViewCategory'
      ? 'text-white text-xs'
      : variant === 'addCard'
      ? 'text-black text-[32px]'
      : variant === 'minimize/close'
      ? 'text-black text-[12px]'
      : variant === 'cardSubCategory'
      ? 'text-white text-[10px]'
      : 'text-purple-400';

  // if (variant === 'edit') {
  //   return (
  //     <button onClick={onClick} className={` ${containerClasses}`}>
  //       <svg
  //         width="15"
  //         height="16"
  //         viewBox="0 0 20 21"
  //         fill="none"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           d="M19.1784 7.38289L6.55161 20.0069L2.20485 20.4877C0.945057 20.6271 -0.127206 19.5647 0.0122364 18.2955L0.493072 13.9497L13.1198 1.32565C14.2209 0.224776 16 0.224776 17.0963 1.32565L19.1736 3.40242C20.2747 4.5033 20.2747 6.28682 19.1784 7.38289ZM14.4277 8.86835L11.634 6.07529L2.70011 15.0121L2.3491 18.1513L5.48896 17.8004L14.4277 8.86835ZM17.5435 5.03691L15.4663 2.96015C15.2692 2.76305 14.947 2.76305 14.7547 2.96015L13.2689 4.44561L16.0626 7.23867L17.5483 5.7532C17.7407 5.55129 17.7407 5.23401 17.5435 5.03691Z"
  //           fill="#0B0B0B"
  //         />
  //       </svg>
  //     </button>
  //   );
  if (variant === 'cardSubCategory') {
    return (
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <div onClick={onClick} className={` ${containerClasses}`}>
          <span className={` ${textClasses}`}>{title}</span>

          <div
            className={`${
              isVisible ? 'inline-block' : 'hidden'
            } relative top-[-23px] left-[-10px] `}
            onClick={e => e.stopPropagation()}
          >
            <div
              id="removeCateogry"
              className="close-icon absolute rounded-full h-5 w-5 hover:border-white  hover:border  flex justify-center items-center bg-opacity-50 bg-black "
              onClick={removeSubCategory}
            >
              {/* <Text content="x" variant="subCategory" textColor="white" /> */}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div onClick={onClick} className={` ${containerClasses}`}>
        <span className={` ${textClasses}`}>{title}</span>
      </div>
    );
  }
};
