import { SupabaseClient } from '@supabase/supabase-js';
import { CTAButton } from '../CTAButton/CTAButton';
import { Text } from '../Text/Text';
import Editor from '../Editor/Editor';
import { Input } from '../Input/Input';

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
  setEditorState?: Function;
}

const Card = (props: CardProps) => {
  // const removeSelf = async () => {
  //   const result = await props.supabase
  //     .from('cards')
  //     .delete()
  //     .match({ id: props.card.id });
  //   if (result.error) console.log(result.error);
  //   else {
  //     const updatedDeck = props.deck;
  //     const idToRemove = updatedDeck.findIndex(card => {
  //       if (card.id === props.card.id) return true;
  //       return false;
  //     });
  //     updatedDeck.splice(idToRemove, 1);
  //     props.setDeck([...updatedDeck]);
  //   }
  // };

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
  if (props.variant === 'openCard' && props.setEditorState) {
    return (
      <>
        <div className="flex absolute top-4 left-[50%] gap-0 w-[690px] h-[300px] bg-white">
          <div
            id="Card"
            className="bg-green-400 h-[300px] w-[200px] rounded-xl border-2 border-black"
          >
            <CTAButton
              variant="cardCategory"
              title={props.card.category_id}
              onClick={() => {
                console.log(props.card.text);
                console.log(props.card.category_id);
              }}
            />

            <Input
              id="CardTitle"
              variant="cardTitle"
              placeholder={props.card.name}
              onChange={() => {}}
              type="text"
            />
            {/* Inte bra med bottom-9, borde vara dynamiskt */}
            <section id="subCategory" className="mt-48 ">
              <div
                id="SubCategoryWrapper"
                className=" flex flex-row flex-wrap gap-1 px-1"
              >
                {/* Mockup subcategories, should be fetched from the database with title and id */}
                <CTAButton
                  variant="cardSubCategory"
                  title="Hackerman"
                  onClick={() => {
                    console.log();
                  }}
                />
                <CTAButton
                  variant="cardSubCategory"
                  title="X"
                  onClick={() => {
                    console.log();
                  }}
                />
                <CTAButton
                  variant="cardSubCategory"
                  title="Albatross"
                  onClick={() => {
                    console.log('hello');
                  }}
                />
                <CTAButton
                  variant="cardSubCategory"
                  title="Weapon"
                  onClick={() => {
                    console.log('Amalgam');
                  }}
                />
                <CTAButton
                  variant="cardSubCategory"
                  title="Weapon"
                  onClick={() => {
                    console.log('Amalgam');
                  }}
                />
              </div>
            </section>
          </div>
          <div className="w-[490px] flex flex-row ">
            <div className="w-[490px] pt-4">
              <Editor
                setEditorState={props.setEditorState}
                card={props.card}
                deck={props.deck}
              />
            </div>
            <div className="z-10">
              <CTAButton
                title="-"
                variant="minimize/close"
                onClick={() => {
                  toggleOpenCard();
                }}
              />
            </div>
          </div>

          {/* <RichTextViewer editorState={props.card.text} /> */}
        </div>
      </>
    );
  }

  if (props.variant === 'deckCard') {
    return (
      <>
        <div
          className=" bg-green-500 h-72 w-52 rounded-xl mr-[-20px] hover:z-10  cursor-pointer hover:border hover:border-black"
          onClick={() => {
            toggleInHand();
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
    );
  }
};

export default Card;
