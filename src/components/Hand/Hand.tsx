import { SupabaseClient } from '@supabase/supabase-js';
import Card from '../Card/Card';

interface HandProps {
  deck: Array<any>;
  supabase: SupabaseClient;
  setDeck: Function;
  categories: any[];
}

const Hand = (props: HandProps) => {
  return (
    <div className=" z-50 absolute bottom-[-230px] grid w-[90%] justify-center grid-cols-[repeat(auto-fit,_minmax(0,_max-content))]  max-w-[80%]">
      {props.deck.map(card => {
        return card.inHand ? (
          <div
            className=" relative hover:bottom-[30px] hover:z-20"
            key={card.id}
          >
            {/* <div className=" absolute bottom-[-230px] hover:bottom-[-220px]"> */}
            <Card
              key={card.id}
              card={card}
              supabase={props.supabase}
              deck={props.deck}
              setDeck={props.setDeck}
              variant="smallCard"
              categories={props.categories}
            />
          </div>
        ) : null;
      })}
    </div>
  );
};

// const Hand = (props: HandProps) => {
//   return (
//     <div className="m-auto absolute px-24 bottom-0 grid w-[90%] justify-center grid-cols-[repeat(auto-fit,_minmax(0,_max-content))]  max-w-[80%]  h-fill">
//       {props.deck.map(card => {
//         return card.inHand ? (
//           <div
//             className="h-[30%] w-52 relative overflow-hidden hover:h-[100%] hover:z-10"
//             key={card.id}

//           >
//             <Card
//               card={card}
//               key={card.id}
//               supabase={props.supabase}
//               deck={props.deck}
//               setDeck={props.setDeck}
//               setSelectedCard={props.setSelectedCard}
//               hand={props.hand}
//               setHand={props.setHand}
//             />
//           </div>
//         ) : null;
//       })}
//     </div>
//   );
// };

export default Hand;
