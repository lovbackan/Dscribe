import { SupabaseClient } from '@supabase/supabase-js';
import { CTAButton } from '../CTAButton/CTAButton';
import { Text } from '../Text/Text';
import Editor from '../Editor/Editor';
import { Input } from '../Input/Input';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';

type CardType = 'openCard' | 'smallCard' | 'deckCard';

// Come up with a better name for this component and CardDesign, this card is the one that is used in the deck view and contains its data.
//But the CardDesign is the one that is used to create newCards and show the stories (but they should propably also be card.tsx because
//they will contain pictures/title/headCategory.
interface CardProps {
  card: {
    name: string;
    id: number;
    user_id: string;
    category_id: number | null;
    text: string;
    tags: any[];
    image_path?: string;
    inHand?: Boolean;
    openCard?: Boolean;
    categories: { name: string };
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
  createCategory?: Function;
  toggleDeletePopup?: Function;
}

interface DropdownProps {
  add: Function;
  create: Function | undefined;
  mappable: any[] | undefined; //Tags or Categories
  card: CardProps['card'];
  variant: 'tags' | 'categories';
  setThisOpen: Function;
}

const Dropdown = (props: DropdownProps) => {
  return (
    <div
      className="bg-black w-full h-10 z-50"
      //Prevents deselection of input field.
      onMouseDown={e => {
        e.preventDefault();
      }}
    >
      <Input
        id="NewCategoryInput"
        variant="secondary"
        placeholder={
          props.variant === 'tags' ? 'Add new tag!' : 'Add new category!'
        }
        type="text"
        autoComplete="off"
        onChange={() => {}}
        onBlur={() => props.setThisOpen(false)}
        autoFocus={true}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            const input = e.target as HTMLInputElement;
            if (input.value === '') return;
            if (props.create) {
              props.create(input.value);
            } else {
              console.log('Card component missing createCategory prop.');
            }
          }
        }}
      />
      {props.mappable?.map(object => {
        if (props.variant === 'tags') {
          const tagExistsOnCard = props.card.tags.find(cardTag => {
            if (cardTag.id === object.id) return true;
            return false;
          });
          if (tagExistsOnCard) return null;
        }
        return (
          <div
            className="w-auto h-auto bg-black"
            onClick={e => {
              e.stopPropagation();
              props.add(object.id);
            }}
            key={object.id}
          >
            <Text content={object.name} variant="p-primary" textColor="white" />
          </div>
        );
      })}
    </div>
  );
};

const Card = (props: CardProps) => {
  const [addTagsWindow, setAddTagsWindow] = useState(false);
  const [addCategoryWindow, setAddCategoryWindow] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!props.card.image_path) return;

    const result = supabase.storage
      .from('images')
      .getPublicUrl(props.card.image_path);
    console.log(result);
    setImageUrl(result.data.publicUrl);
  }, [props.card.image_path]);

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  const uploadImage = async (file: File) => {
    if (file === null) return;
    const filepath = `${props.card.user_id}/${file.name}`;

    const result = await supabase.storage
      .from('images')
      .upload(filepath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    const uploadError: any = result.error;
    if (uploadError) console.log(uploadError);
    if (uploadError && uploadError.statusCode === '409') {
      alert('File already exists');
      return;
    }

    const { data, error } = await supabase
      .from('cards')
      .update({ image_path: filepath })
      .eq('id', props.card.id);
    if (error) {
      console.log(error);
      return;
    }

    const newDeck = props.deck;
    const index = getCardIndex();
    newDeck[index].image_path = filepath;
    props.setDeck([...newDeck]);
    console.log(newDeck);
  };

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

    //Make removeTag function here

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

  const setCategory = (categoryId: number) => {
    console.log(categoryId);
    if (!props.deckChanges || !props.setDeckChanges) {
      console.log('Neccessary props missing from card component.');
      return;
    }
    const cardIndex = getCardIndex();
    const cardChangesIndex = getCardChangesIndex();

    const newDeck = props.deck;
    newDeck[cardIndex].category_id = categoryId;
    props.setDeck([...newDeck]);

    const newDeckChanges = props.deckChanges;
    if (cardChangesIndex === -1) {
      newDeckChanges.push({ id: props.card.id, category_id: categoryId });
    } else {
      newDeckChanges[cardChangesIndex].category_id = categoryId;
    }
    props.setDeckChanges([...newDeckChanges]);

    console.log(props.deckChanges);
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
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    setCategoryName(
      props.card.category_id && props.categories
        ? props.categories[
            props.categories?.findIndex(category => {
              if (category.id === props.card.category_id) return true;
              else return false;
            })
          ].name
        : 'No cateogry',
    );
  }, [props.card.category_id]);

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
          {imageUrl && (
            <img
              src={imageUrl}
              alt=""
              className="absolute -z-10 w-full h-full rounded-xl"
              draggable="false"
            />
          )}
          <div className="flex flex-row justify-between">
            <CTAButton
              variant="cardCategory"
              title={categoryName}
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
        <div className="flex relative  gap-0 w-[690px] h-[300px] bg-white drop-shadow-lg rounded-xl">
          <div
            id="Card"
            className="bg-gradient-to-b from-[#5179D9] to-[#0F172A] h-[300px] w-[200px] rounded-xl border-2 border-black relative -z-20"
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt=""
                className="absolute -z-10 h-full w-full rounded-xl"
                draggable="false"
              />
            )}
            <CTAButton
              variant="cardCategory"
              title={categoryName}
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

            <section
              id="subCategory"
              className="relative h-[200px] overflow-auto flex flex-col justify-end "
            >
              <div
                id="SubCategoryWrapper"
                className="flex flex-row flex-wrap gap-1 px-1"
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
            <div className=" absolute right-0 z-10 cursor-pointer">
              <CTAButton
                title="-"
                variant="minimize/close"
                onClick={() => {
                  toggleOpenCard();
                }}
              />
            </div>
            <div className="w-[490px] pt-4 h-[300px]">
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
          {imageUrl && (
            <img
              src={imageUrl}
              alt=""
              className="absolute  -z-10 w-full h-full rounded-xl"
              draggable="false"
            />
          )}
          <div className="flex flex-row justify-between">
            <CTAButton
              variant="cardCategory"
              title={categoryName}
              onClick={e => {
                e.stopPropagation();
                setAddCategoryWindow(!addCategoryWindow);
              }}
            />

            <div
              className="h-[42px] flex flex-row justify-end gap-2 pr-2 pt-2"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              {isHovered && !addCategoryWindow && (
                <CTAButton
                  variant="deleteCard"
                  title=""
                  onClick={() => {
                    if (props.toggleDeletePopup) {
                      props.toggleDeletePopup();
                    }
                    console.log('press form card component');
                  }}
                  //Needs a confirmation box.
                  // removeSelf();
                />
              )}
              {isHovered && !addCategoryWindow && (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                  }}
                >
                  <input
                    className=" hidden"
                    id="file-upload"
                    type="file"
                    accept=" .png, .jpg, .gif"
                    name="image"
                    onChange={e => {
                      e.preventDefault();

                      if (e.target.files) {
                        if (e.target.files[0].size > 2097152) {
                          alert('File is too big!');
                          return;
                        }
                        uploadImage(e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="file-upload" className="custom-file-upload">
                    <CTAButton
                      variant="changePicture"
                      title=""
                      onClick={() => {}}
                    />
                  </label>
                </form>
              )}
            </div>
          </div>
          {addCategoryWindow && (
            <div className=" absolute top-4 w-full">
              <Dropdown
                add={setCategory}
                create={props.createCategory}
                card={props.card}
                mappable={props.categories}
                variant="categories"
                setThisOpen={setAddCategoryWindow}
              />
            </div>
          )}
          <div
            onClick={event => {
              event.stopPropagation();
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
                    removeSubCategory={() => {
                      //Here our remove tag function should be
                      console.log(
                        `ta bort ${tag.name}: ${tag.id} från ${props.card.name}`,
                      );
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
            <Dropdown
              mappable={props.tags}
              card={props.card}
              add={addTag}
              create={props.createTag}
              variant="tags"
              setThisOpen={setAddTagsWindow}
            />
          ) : null}
        </div>
      </>
    );
  }
};

export default Card;
