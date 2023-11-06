import { SupabaseClient } from '@supabase/supabase-js';
import { CTAButton } from '../CTAButton/CTAButton';
import { Text } from '../Text/Text';

type CardType = 'openCard' | 'smallCard' | 'deckCard';

// Come up with a batter name for this component and CardDesign, this card is the one that is used in the deck view and contains its data.
//But the CardDesign is the one that is used to create newCards and show the stories (but they should propably also be card.tsx because
//they will contain pictures/title/headCategory.
interface CardProps {
  card: {
    name: string;
    id: number;
    category_id: number;
    text: string;
    inHand?: Boolean;
    openCard?: Boolean;
  };
  variant: CardType;
  supabase: SupabaseClient;
  deck: Array<any>;
  setDeck: Function;
  setSelectedCard: Function;
}

const Card = (props: CardProps) => {
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

  const toggleOpenCard = () => {
    const cardIndex = props.deck.findIndex(card => {
      if (props.card.id === card.id) return true;
      else return false;
    });

    if (props.card.openCard) props.deck[cardIndex].openCard = false;
    else props.deck[cardIndex].openCard = true;

    props.setDeck([...props.deck]);
    console.log(props.deck[cardIndex]);
  };

  if (props.variant === 'smallCard') {
    return (
      <>
        <div
          className=" bg-green-500 h-72 w-52 rounded-xl mr-[-20px] hover:z-10  cursor-pointer hover:border hover:border-black"
          onClick={() => {
            toggleOpenCard();
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
