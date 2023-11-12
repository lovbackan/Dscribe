import { SupabaseClient } from '@supabase/supabase-js';
import { CTAButton } from '../CTAButton/CTAButton';
import { Text } from '../Text/Text';
import Editor from '../Editor/Editor';
import { Input } from '../Input/Input';
import { supabase } from '../../supabase';
import { useState } from 'react';

type CardType = 'openCard' | 'smallCard' | 'deckCard';

// Come up with a better name for this component and CardDesign, this card is the one that is used in the deck view and contains its data.
//But the CardDesign is the one that is used to create newCards and show the stories (but they should propably also be card.tsx because
//they will contain pictures/title/headCategory.
interface CardProps {
  card: {
    name: string;
    id: number;
    category_id: number | null;
    text: string;
    tags: any[];
    inHand?: Boolean;
    openCard?: Boolean;
  };
  variant: CardType;
  supabase: SupabaseClient;
  deck: any[];
  setDeck: Function;
  setEditorState?: Function;
  editorState?: any[];
  deckChanges?: any[];
  setDeckChanges?: Function;
  categories?: any[];
  setCategories?: Function;
  tags?: any[];
  setTags?: Function;
  createTag?: Function;
}

const Card = (props: CardProps) => {
  const [addTagsWindow, setAddTagsWindow] = useState(false);
  const [addCategoryWindow, setAddCategoryWindow] = useState(false);
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

  const changeCardName = async (e: React.FocusEvent<HTMLInputElement>) => {
    {
      const newName = e.target.value;
      const cardIndex = getCardIndex();

      const newDeck = props.deck;
      newDeck[cardIndex].name = newName;
      if (
        props.deck[cardIndex] === newName ||
        !props.deckChanges ||
        !props.setDeckChanges
      )
        return;

      const newDeckChanges = props.deckChanges;
      const cardChangesIndex = getCardChangesIndex();
      if (cardChangesIndex === -1) {
        newDeckChanges?.push({
          id: props.card.id,
          name: newName,
        });
      } else {
        newDeckChanges[cardChangesIndex].name = newName;
      }
      props.setDeck([...newDeck]);
      props.setDeckChanges([...newDeckChanges]);
    }
  };

  const addTag = (tagId: number) => {
    if (!props.tags || !props.deckChanges || !props.setDeckChanges) {
      console.log('Neccessary props missing from card component.');
      return;
    }
    const cardIndex = getCardIndex();
    const cardChangesIndex = getCardChangesIndex();
    const tagIndex = props.tags.findIndex(tag => {
      if (tag.id === tagId) return true;
      return false;
    });

    const newDeck = props.deck;
    newDeck[cardIndex].tags.push(props.tags[tagIndex]);
    props.setDeck([...newDeck]);

    const newDeckChanges = props.deckChanges;
    if (cardChangesIndex === -1) {
      newDeckChanges.push({ id: props.card.id, tags: [props.tags[tagIndex]] });
    } else {
      newDeckChanges[cardChangesIndex].tags.push(props.tags[tagIndex]);
    }
    props.setDeckChanges([...newDeckChanges]);
  };

  const getCardIndex = (): number => {
    const cardIndex = props.deck.findIndex(deckCard => {
      if (props.card.id === deckCard.id) return true;
      return false;
    });

    return cardIndex;
  };

  const getCardChangesIndex = (): number => {
    let cardChangesIndex = props.deckChanges?.findIndex(deckCard => {
      if (props.card.id === deckCard.id) return true;
      return false;
    });
    if (cardChangesIndex === undefined) cardChangesIndex = -1;
    return cardChangesIndex;
  };

  const toggleOpenCard = () => {
    const cardIndex = props.deck.findIndex(card => {
      if (props.card.id === card.id) return true;
      else return false;
    });

    if (props.card.openCard) props.deck[cardIndex].openCard = false;
    else props.deck[cardIndex].openCard = true;

    props.setDeck([...props.deck]);
  };

  const [isHovered, setIsHovered] = useState(false);

  if (props.variant === 'smallCard') {
    return (
      <>
        <div
          className=" bg-gradient-to-b from-[#5179D9] to-[#0F172A] drop-shadow-lg h-72 w-52 rounded-xl mr-[-20px] hover:z-10  cursor-pointer hover:border hover:border-black"
          onClick={() => {
            //here we should also make it so that the latest card u pressed has the highest z-index
            toggleOpenCard();
          }}
        >
          <div className="flex flex-row justify-between">
            <CTAButton
              variant="cardCategory"
              title={
                props.card.category_id ? props.card.category_id : 'No cateogry'
              }
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
        <div className="flex relative  gap-0 w-[690px] h-[300px] bg-white drop-shadow-lg">
          <div
            id="Card"
            className="bg-gradient-to-b from-[#5179D9] to-[#0F172A] h-[300px] w-[200px] rounded-xl border-2 border-black"
          >
            <CTAButton
              variant="cardCategory"
              title={
                props.card.category_id ? props.card.category_id : 'No cateogry'
              }
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
              onBlur={e => changeCardName(e)}
              type="text"
              autoComplete="off"
            />
            {/* Inte bra med bottom-9, borde vara dynamiskt */}
            <section id="subCategory" className="mt-48 ">
              <div
                id="SubCategoryWrapper"
                className=" flex flex-row flex-wrap gap-1 px-1"
              >
                {props.card.tags.map(tag => {
                  return (
                    <CTAButton
                      key={tag.id}
                      variant="cardSubCategory"
                      title={tag.name}
                      onClick={() => {
                        console.log('Slackerman');
                      }}
                    />
                  );
                })}
              </div>
            </section>
          </div>
          <div className="w-[490px] flex flex-row ">
            <div className=" absolute right-0 z-10">
              <CTAButton
                title="-"
                variant="minimize/close"
                onClick={() => {
                  toggleOpenCard();
                }}
              />
            </div>
            <div className="w-[490px] pt-4">
              <Editor
                setEditorState={props.setEditorState}
                card={props.card}
                deck={props.deck}
                setDeck={props.setDeck}
                deckChanges={props.deckChanges}
                setDeckChanges={props.setDeckChanges}
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
          className=" bg-gradient-to-b from-[#5179D9] to-[#0F172A] drop-shadow-lg h-72 w-52 rounded-xl mr-[-20px] hover:z-10  cursor-pointer hover:border hover:border-black"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            toggleInHand();
          }}
        >
          <div className="flex flex-row justify-between">
            <CTAButton
              variant="cardCategory"
              title={
                props.card.category_id ? props.card.category_id : 'No cateogry'
              }
              onClick={() => {
                console.log(props.card.text);
                console.log(props.card.category_id);
              }}
            />
            <div
              className="h-[42px] flex flex-row justify-end gap-2 pr-2 pt-2"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              {isHovered && (
                <CTAButton
                  variant="deleteCard"
                  title=""
                  // onClick={() => props.setChangeCardId(props.story)}
                  onClick={() => {
                    console.log('delete card from deck');
                  }}
                />
              )}
              {isHovered && (
                <CTAButton
                  variant="changePicture"
                  title=""
                  onClick={() => {
                    console.log('Change picture of card');
                  }}
                />
              )}
            </div>
          </div>
          <div
            onClick={event => {
              event.stopPropagation(); // Stop the event from propagating to the parent div
              console.log('edit');
            }}
          >
            <Input
              id={props.card.id.toString()}
              variant="cardTitle"
              placeholder={props.card.name}
              onChange={() => {}}
              type="text"
              onBlur={e => changeCardName(e)}
            />
          </div>
          <section id="subCategory" className="mt-40 ">
            <div
              id="SubCategoryWrapper"
              className=" flex flex-row flex-wrap gap-1 px-1"
            >
              {props.card.tags?.map(tag => {
                return (
                  <CTAButton
                    key={tag.id}
                    variant="cardSubCategory"
                    title={tag.name}
                    onClick={event => {
                      event.stopPropagation();
                      console.log(tag.name);
                    }}
                  />
                );
              })}
              {/* Should be special "+" button. Placeholder CTAButton for now.  */}
              <CTAButton
                variant="cardSubCategory"
                title="New Category"
                onClick={event => {
                  event.stopPropagation();
                  setAddTagsWindow(!addTagsWindow);
                }}
              />
            </div>
          </section>
          {addTagsWindow ? (
            <div
              className="bg-black w-full h-10"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              {props.tags?.map(tag => {
                const tagExistsOnCard = props.card.tags.find(cardTag => {
                  if (cardTag.id === tag.id) return true;
                  return false;
                });
                if (tagExistsOnCard) return null;

                return (
                  <h1
                    className="text-cyan-300"
                    onClick={e => {
                      e.stopPropagation();
                      addTag(tag.id);
                    }}
                    key={tag.id}
                  >
                    {tag.name}
                  </h1>
                );
              })}
              <h1
                className=" bg-red-200"
                onClick={() => {
                  console.log(props);
                  if (props.createTag) props.createTag();
                  else console.log('Card component missing createTag prop.');
                }}
              >
                Add new tag!
              </h1>
            </div>
          ) : null}
        </div>
      </>
    );
  }
};

export default Card;
