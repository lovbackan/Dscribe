import React from 'react';
import { useState } from 'react';

type ButtonType =
  | 'primary'
  | 'secondary'
  | 'landing'
  | 'landing2'
  | 'minimize/close'
  | 'cardCategory'
  | 'cardSubCategory'
  | 'deckViewCategory'
  | 'deckViewCategoryFiltered'
  | 'disabled'
  | 'deck'
  // | 'edit'
  | 'viewDeck'
  | 'addCard'
  | 'deleteCard'
  | 'changePicture'
  | 'addTags'
  | 'publishStory'
  | 'closeSmall'
  | 'closeBig'
  | 'popUpSmall';

interface CTAButtonProps {
  title: string | number;
  variant: ButtonType;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  remove?: (event: React.MouseEvent<HTMLDivElement>) => void;
  color?: number | null;
}

//FC is a type that ships with React's TypeScript types. It represents the type of a functional component, which is the building block of most modern React apps. tsx. // Component without props. const Component : React .
export const CTAButton: React.FC<CTAButtonProps> = ({
  title,
  onClick,
  variant,
  remove,
  color,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  let containerClasses =
    variant === 'primary'
      ? 'bg-white  h-[27px] w-[80px] rounded-[5px] flex justify-center items-center hover:border-black hover:border cursor-pointer'
      : variant === 'secondary'
      ? 'bg-white border-black h-[27px] w-[139px] rounded-[5px] flex justify-center items-center hover:border-black hover:border cursor-pointer'
      : variant === 'landing'
      ? 'w-[126px] h-[48px] border border-white rounded-[5px] flex justify-center items-center hover:border-2 cursor-pointer'
      : variant === 'landing2'
      ? 'w-[307x] h-[48px] border border-white rounded-[5px] flex justify-center items-center hover:border-2 cursor-pointer'
      : variant === 'cardCategory'
      ? 'bg-black h-4 min-w-[40px] w-auto border-transparent border rounded-tl-[8px] rounded-br-[8px] flex justify-center items-center hover:border-white hover:border cursor-pointer p-2'
      : variant === 'deckViewCategory'
      ? 'w-auto p-2 h-5 rounded-xl bg-black flex justify-center items-center border-transparent border hover:border-black hover:border cursor-pointer'
      : variant === 'deckViewCategoryFiltered'
      ? 'w-auto p-2 h-5 rounded-xl bg-black flex justify-center items-center border-black border border-2 cursor-pointer'
      : variant === 'addCard'
      ? 'w-12 h-20 rounded-xl bg-white border-2 border-black flex justify-center items-center hover:border-green-700 hover:border-4 cursor-pointer'
      : // : variant === 'edit'
      // ? 'w-6 h-6 bg-white  flex justify-center items-center hover:border-black hover:border rounded '
      variant === 'minimize/close'
      ? 'w-[20px] h-[20px] rounded-[5px] flex justify-center items-center hover:border-black hover:border cursor-pointer'
      : variant === 'cardSubCategory'
      ? 'w-auto h-[20px] rounded-[12px] bg-black border-transparent border flex justify-center items-center hover:border-white px-2 cursor-pointer'
      : variant === 'viewDeck'
      ? 'w-14 h-24 deck-icon cursor-pointer'
      : variant === 'deleteCard'
      ? 'deleteCard hover:border-2 hover:border-white cursor-pointer'
      : variant === 'changePicture'
      ? 'uploadPicture hover:border-2 hover:border-white cursor-pointer'
      : variant === 'addTags'
      ? 'addTags hover:border-2 hover:border-white cursor-pointer'
      : variant === 'publishStory'
      ? 'w-[100px] h-[25px] rounded-[5px] flex justify-center items-center hover:border-white hover:border-2 cursor-pointer bg-black bg-opacity-50'
      : variant === 'closeSmall'
      ? 'new-close-icon absolute right-0 rounded-lg mt-[8px] mr-[8px] h-[25px] w-[25px] hover:border-white  hover:border  flex justify-center items-center bg-opacity-50 bg-black cursor-pointer'
      : variant === 'closeBig'
      ? 'new-close-icon-big absolute right-0 rounded-lg mt-[8px] mr-[8px] h-[40px] w-[40px] hover:border-white  hover:border  flex justify-center items-center bg-opacity-50 bg-black cursor-pointer'
      : variant === 'popUpSmall'
      ? 'w-[41px] h-[27px] items-center flex justify-center bg-white rounded cursor-pointer hover:border-black hover:border'
      : 'bg-purple-400';

  const textClasses =
    variant === 'primary'
      ? 'text-black text-[12px] font-inter'
      : variant === 'secondary'
      ? 'text-black text-[12px] font-inter'
      : variant === 'landing'
      ? 'text-white text-3xl font-inter '
      : variant === 'landing2'
      ? 'text-white text-3xl font-inter '
      : variant === 'cardCategory'
      ? 'text-white text-xs font-inter'
      : variant === 'deckViewCategory' || variant === 'deckViewCategoryFiltered'
      ? 'text-white text-xs font-inter'
      : variant === 'addCard'
      ? 'text-black text-[32px] font-inter'
      : variant === 'minimize/close'
      ? 'text-black text-[20px] font-inter'
      : variant === 'cardSubCategory'
      ? 'text-white text-[10px] font-inter'
      : variant === 'publishStory'
      ? 'text-white text-[12px] font-inter'
      : variant === 'closeSmall'
      ? 'text-white text-[12px] font-inter'
      : variant === 'closeBig'
      ? 'text-white text-[12px] font-inter'
      : variant === 'popUpSmall'
      ? 'text-black text-[12px] font-inter'
      : 'text-purple-400';

  const colors = [
    'bg-[#699B68]',
    'bg-[#EF8181]',
    'bg-[#826748]',
    'bg-[#638FC2]',
    'bg-[#92479E]',
    'bg-[#7CB9BD]',
    'bg-[#BA8A76]',
    'bg-[#E579CE]',
  ];

  if (color != null) {
    containerClasses = containerClasses.replace('bg-black', colors[color]);
  }

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
  if (
    variant === 'cardSubCategory' ||
    variant === 'deckViewCategory' ||
    variant === 'deckViewCategoryFiltered'
  ) {
    return (
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onMouseDown={e => e.preventDefault()}
      >
        <div onClick={onClick} className={` ${containerClasses}`}>
          <span className={` ${textClasses}`}>{title}</span>

          <div
            className={`${
              isVisible ? 'inline-block' : 'hidden'
            } relative top-[-23px] left-[-10px] `}
            onClick={e => e.stopPropagation()}
          >
            {remove && (
              <div
                id="removeCateogry"
                className="close-icon absolute rounded-full h-5 w-5 hover:border-white  hover:border  flex justify-center items-center bg-opacity-50 bg-black "
                onClick={remove}
              >
                {/* <Text content="x" variant="subCategory" textColor="white" /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={onClick}
        className={` ${containerClasses}`}
        onMouseDown={e => e.preventDefault()}
      >
        <span className={` ${textClasses}`}>{title}</span>
      </div>
    );
  }
};
