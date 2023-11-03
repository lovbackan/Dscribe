import { SupabaseClient } from '@supabase/supabase-js';
import { CTAButton } from '../CTAButton/CTAButton';
// import RichTextViewer from '../RichTextViewer/RichTextViewer';
import { Text } from '../Text/Text';
// import { useState } from 'react';
// import { EditorState } from 'lexical';
// 18-10-2023 Mostly just functionality for testing database.

type CardType = 'openCard' | 'smallCard' | 'deckCard';

interface CardProps {
  card: {
    name: string;
    id: number;
    category_id: number;
    text: string;
    inHand?: boolean;
  };
  variant: CardType;
  supabase: SupabaseClient;
  deck: Array<any>;
  setDeck: Function;
  setSelectedCard: Function;
  hand: Array<any>;
  setHand: Function;
}

const Card = (props: CardProps) => {
  // const [inHand, setInHand] = useState(true);

  const removeSelf = async () => {
    const result = await props.supabase
      .from('cards')
      .delete()
      .match({ id: props.card.id });
    if (result.error) console.log(result.error);
    else {
      const updatedDeck = props.deck;
      const idToRemove = updatedDeck.findIndex(card => {
        if (card.id === props.card.id) return true;
        return false;
      });
      updatedDeck.splice(idToRemove, 1);
      props.setDeck([...updatedDeck]);
    }
  };

  const toggleInHand = () => {
    const cardIndex = props.deck.findIndex(card => {
      if (props.card.id === card.id) return true;
      else return false;
    });

    if (props.card.inHand) props.deck[cardIndex].inHand = false;
    else props.deck[cardIndex].inHand = true;

    props.setDeck([...props.deck]);
  };

  if (props.variant === 'smallCard') {
    return (
      <>
        <div
          className=" bg-green-500 h-72 w-52 rounded-xl mr-[-20px] hover:z-10  cursor-pointer hover:border hover:border-black"
          onClick={() => {
            if (props.card.inHand) {
              props.setSelectedCard(props.card);
              //här ska vi lägga till funktionalitet som skapar ett open card och visar det
            } else {
              toggleInHand();
              console.log('You pressed the card');
            }
          }}
        >
          <div className="flex flex-row justify-between">
            <CTAButton
              variant="cardCategory"
              title={props.card.category_id}
              onClick={() => {
                console.log(props.card.text);
                console.log(props.card.category_id);
              }}
            />

            <CTAButton
              variant="minimize/close"
              title="X"
              onClick={event => {
                event.stopPropagation(); // Stop the event from propagating to the parent div
                if (props.card.inHand) toggleInHand();
              }}
            />
          </div>
          <Text
            content={props.card.name}
            textColor="white"
            variant="cardTitle"
          />
        </div>
      </>
    );
  }
  if (props.variant === 'openCard') {
    return (
      <>
        <div className="bg-white h-[30%] w-[40%] rounded-xl">
          <Text
            content={props.card.name}
            textColor="black"
            variant="cardTitle"
          />

          {/* <RichTextViewer editorState={props.card.text} /> */}
        </div>
      </>
    );
  }

  if (props.variant === 'deckCard') {
    return (
      <>
        <>
          <div
            className=" bg-green-500 h-72 w-52 rounded-xl mr-[-20px] hover:z-10  cursor-pointer hover:border hover:border-black"
            onClick={() => {
              if (props.card.inHand) {
                props.setSelectedCard(props.card);
                //här ska vi lägga till funktionalitet som skapar ett big card och visar det
              } else {
                toggleInHand();
                console.log('You pressed the card');
              }
            }}
          >
            <div className="flex flex-row justify-between">
              <CTAButton
                variant="cardCategory"
                title={props.card.category_id}
                onClick={() => {
                  console.log(props.card.text);
                  console.log(props.card.category_id);
                }}
              />
              {/* <div className="p-2">
                <CTAButton
                  variant="edit"
                  title=""
                  onClick={event => {
                    event.stopPropagation(); // Stop the event from propagating to the parent div
                    console.log('edit');
                  }}
                />
              </div> */}
            </div>
            <Text
              content={props.card.name}
              textColor="white"
              variant="cardTitle"
            />
          </div>
        </>
      </>
    );
  }
};

export default Card;
