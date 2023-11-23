import { SupabaseClient } from '@supabase/supabase-js';
import { CTAButton } from '../CTAButton/CTAButton';
import { Text } from '../Text/Text';
import Editor from '../Editor/Editor';
import { Input } from '../Input/Input';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import RichTextViewer from '../RichTextViewer/RichTextViewer';

type CardType =
  | 'openCardRead'
  | 'openCard'
  | 'smallCard'
  | 'deckCard'
  | 'publishedCard';

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
  deck: CardProps['card'][];
  setDeck: Function;
  deckChanges?: any[];
  setDeckChanges?: Function;
  categories?: any[];
  setCategories?: Function;
  tags?: any[];
  setTags?: Function;
  createTag?: Function;
  createCategory?: Function;
  toggleDeletePopup?: Function;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
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
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div
      className={`bg-[#0F172A] w-full z-50 `}
      //Prevents deselection of input field.
      //gör om istället att inputen sortar alla tags/kategorier utifrån inputen, om det inte finns något alternativ så kommer en div upp som heter create category/tag
    >
      <Input
        id="NewCategoryInput"
        variant="secondary"
        placeholder={
          props.variant === 'tags' ? 'Add new tag!' : 'Add new category!'
        }
        type="text"
        autoComplete="off"
        onChange={event => setSearchTerm(event.target.value)}
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
      <div
        className={`w-full h-auto bg-black flex flex-row flex-wrap gap-2 ${
          props.mappable && props.mappable.length > 0 ? 'py-2 px-2 ' : ''
        } `}
      >
        {props.mappable
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .filter(object => object.name.includes(searchTerm))
          .map(object => {
            if (props.variant === 'tags') {
              const tagExistsOnCard = props.card.tags.find(cardTag => {
                if (cardTag.id === object.id) return true;
                return false;
              });
              if (tagExistsOnCard) return null;
            }

            return (
              <div
                onMouseDown={e => {
                  e.preventDefault();
                }}
                className={`w-auto h-auto `}
                key={object.id}
              >
                <CTAButton
                  key={object.id}
                  variant="cardSubCategory"
                  title={object.name}
                  onClick={e => {
                    e.stopPropagation();
                    props.add(object.id);
                  }}
                  color={object.color_id}
                />
              </div>
            );
          })}
      </div>
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
      //alert('File already exists');
      //return;
    }

    const { error } = await supabase
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
      if (
        props.deck[cardIndex].name === newName ||
        !props.deckChanges ||
        !props.setDeckChanges
      )
        return;
      newDeck[cardIndex].name = newName;

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

  const removeTag = async (tagId: number) => {
    const cardIndex = getCardIndex();
    const tagIndex = props.deck[cardIndex].tags.findIndex(
      (tag: { id: number }) => {
        if (tag.id === tagId) return true;
        return false;
      },
    );

    const { error } = await supabase
      .from('cards_tags')
      .delete()
      .match({ tag_id: tagId, card_id: props.card.id });
    if (error) {
      alert('Failed to delete. Error: ' + error.message);
      return;
    }

    const newDeck = props.deck;
    newDeck[cardIndex].tags.splice(tagIndex, 1);
    props.setDeck([...newDeck]);
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
  const [categoryColor, setCategoryColor] = useState<number | null>(null);

  useEffect(() => {
    const categoryIndex = props.categories?.findIndex(category => {
      if (category.id === props.card.category_id) return true;
      else return false;
    });

    if (
      categoryIndex === -1 ||
      categoryIndex === undefined ||
      props.card.category_id === null ||
      props.categories === undefined
    ) {
      setCategoryName('No category');
      setCategoryColor(null);
      return;
    }
    const category = props.categories[categoryIndex];
    setCategoryName(category.name);
    setCategoryColor(category.color_id);
  }, [props.card.category_id]);

  if (props.variant === 'smallCard') {
    return (
      <>
        <div
          className=" bg-gradient-to-b from-[#0F172A] to-[#5179D9] z-0 drop-shadow-lg shadow-right-bottom h-[300px] w-[200px] rounded-[10px] mr-[-20px] hover:z-10  cursor-pointer hover:border-2 hover:border-black"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            toggleOpenCard();
          }}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt=""
              className="absolute -z-10 w-full h-full rounded-[10px]"
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
              color={categoryColor}
            />

            {isHovered && (
              <CTAButton
                variant="closeSmall"
                title=""
                onClick={event => {
                  event.stopPropagation(); // Stop the event from propagating to the parent div
                  if (props.card.inHand) toggleInHand();
                }}
              />
            )}
          </div>

          {/* <div className="  w-[150px] h-[44px] resize-none rounded-lg text-white px-2 py-1 text-center bg-black placeholder-white hover:border-white hover:border hover:border-2 bg-opacity-70 font-inter">
            <Text
              content={props.card.name}
              textColor="white"
              variant="cardTitle"
            />
          </div> */}

          <div className=" h-auto min-h-[40px] w-[150px] ml-[23px] mt-4 bg-black bg-opacity-60 rounded-[10px] flex justify-center items-center">
            <Text
              content={props.card.name}
              textColor="white"
              variant="heading4"
            />
          </div>
        </div>

        {/* <div className=" h-auto min-h-[44px] w-[150px] ml-[23px] mt-1 bg-black bg-opacity-60 rounded-lg p-2">
            <Text
              content={props.card.name}
              textColor="white"
              variant="heading3"
            />
          </div>
        </div> */}
      </>
    );
  }
  if (props.variant === 'openCard') {
    return (
      <>
        <div className="flex relative  gap-0 w-[690px] h-[300px] -z-10 bg-white shadow-[0_0_10px_5px_rgba(0,0,0,0.2)] rounded-[10px]">
          <div
            id="cardWrapper"
            className={` ${
              imageUrl
                ? 'bg-none'
                : 'bg-gradient-to-b from-[#0F172A] to-[#5179D9]'
            } h-[300px] w-[200px] rounded-[10px]  relative -z-20 drop-shadow-md`}
            onMouseDown={props.handleMouseDown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt=""
                className="absolute -z-10 h-full w-full rounded-[10px]"
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
                color={categoryColor}
              />
              <div
                className="h-[42px] flex flex-row justify-end gap-2 pr-2 pt-2"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
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

            <Input
              id="CardTitle"
              variant="cardTitle"
              placeholder={props.card.name}
              onChange={() => {}}
              onBlur={e => {
                changeCardName(e);
              }}
              type="text"
              autoComplete="off"
            />

            <section id="subCategory" className="mt-36 ">
              <div
                id="SubCategoryWrapper"
                className="flex flex-row flex-wrap gap-1 px-1 h-16 overflow-y-auto pt-4 bg-transparent"
              >
                {isHovered && (
                  <CTAButton
                    variant="addTags"
                    title=""
                    onClick={event => {
                      event.stopPropagation();
                      setAddTagsWindow(!addTagsWindow);
                    }}
                  />
                )}
                {props.card.tags.map(tag => {
                  return (
                    <CTAButton
                      key={tag.id}
                      variant="cardSubCategory"
                      title={tag.name}
                      onClick={() => {
                        console.log('Slackerman');
                      }}
                      remove={() => removeTag(tag.id)}
                      color={tag.color_id}
                    />
                  );
                })}
              </div>
            </section>
            {addTagsWindow && (
              <Dropdown
                mappable={props.tags}
                card={props.card}
                add={addTag}
                create={props.createTag}
                variant="tags"
                setThisOpen={setAddTagsWindow}
              />
            )}
          </div>
          <div className="ml-[5px] w-[490px] flex flex-row">
            {/* remove the bg color and drag, and place the close button in the toolbar if possible */}
            <div
              className="absolute w-[490px] pr-2 h-5 flex justify-end z-10"
              // onMouseDown={props.handleMouseDown}
            >
              <CTAButton
                title="-"
                variant="minimize/close"
                onClick={() => {
                  toggleOpenCard();
                }}
              />
            </div>

            <div className="w-[490px] pt-4 h-[290px]">
              <Editor
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

  if (props.variant === 'openCardRead') {
    return (
      <>
        <div className="flex relative  gap-0 w-[690px] h-[300px] -z-10 bg-white shadow-[0_0_10px_5px_rgba(0,0,0,0.2)] rounded-[10px]">
          <div
            id="cardWrapper"
            className="bg-gradient-to-b from-[#0F172A] to-[#5179D9] h-[300px] w-[200px] rounded-[10px] border-2 border-black relative -z-20"
            onMouseDown={props.handleMouseDown}
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt=""
                className="absolute -z-10 h-full w-full rounded-[10px]"
                draggable="false"
              />
            )}
            <div className="w-min">
              <CTAButton
                variant="cardCategory"
                title={categoryName}
                onClick={() => {
                  console.log(props.card.text);
                  console.log(props.card.category_id);
                }}
                color={categoryColor}
              />
            </div>
            <div className=" h-auto  w-[150px] ml-[23px] mt-4 bg-black bg-opacity-60 rounded-[10px] p-2">
              <Text
                content={props.card.name}
                textColor="white"
                variant="cardTitle"
              />
            </div>

            <section id="subCategory" className="mt-40 ">
              <div
                id="SubCategoryWrapper"
                className="flex flex-row flex-wrap gap-1 px-1 h-18 overflow-y-auto pt-1 bg-transparent"
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
                      color={tag.color_id}
                    />
                  );
                })}
              </div>
            </section>
          </div>
          <div className="w-[490px] h-[300px] pt-6">
            <div className="pr-1 pt-1 absolute z-10 top-0 right-0">
              <CTAButton
                title="-"
                variant="minimize/close"
                onClick={() => {
                  toggleOpenCard();
                }}
              />
            </div>
            <div className="w-[490px] h-[300px] ">
              <RichTextViewer editorState={props.card.text} />
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
          className={`bg-gradient-to-b ${
            imageUrl ? 'bg-none' : 'from-[#0F172A] to-[#5179D9]'
          }  drop-shadow-lg shadow-right-bottom h-[300px] w-[200px] rounded-[10px]  hover:z-10  cursor-pointer hover:border-2 hover:border-black `}
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
              className="absolute -z-10 w-full h-full rounded-[10px]"
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
              color={categoryColor}
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
          <section id="subCategory" className="mt-36 ">
            <div
              id="SubCategoryWrapper"
              className=" flex flex-row flex-wrap gap-1 px-1 h-16 overflow-y-auto pt-4 bg-transparent  "
            >
              <CTAButton
                variant="addTags"
                title=""
                onClick={event => {
                  event.stopPropagation();
                  setAddTagsWindow(!addTagsWindow);
                }}
              />
              {props.card.tags?.map(tag => {
                return (
                  <CTAButton
                    key={tag.id}
                    variant="cardSubCategory"
                    title={tag.name}
                    onClick={event => {
                      event.stopPropagation();
                    }}
                    remove={() => {
                      removeTag(tag.id);
                    }}
                    color={tag.color_id}
                  />
                );
              })}
            </div>
          </section>
          {addTagsWindow && (
            <Dropdown
              mappable={props.tags}
              card={props.card}
              add={addTag}
              create={props.createTag}
              variant="tags"
              setThisOpen={setAddTagsWindow}
            />
          )}
        </div>
      </>
    );
  }

  if (props.variant === 'publishedCard') {
    return (
      <div
        onClick={() => {
          console.log('published');
        }}
        className={`h-72 w-52 rounded-[10px] border-2 justify-center items-center cursor-pointer hover:border-red-300 hover:border bg-white border-black`}
      >
        <Text content="{title}" textColor="black" variant="cardTitle" />
      </div>
    );
  }
};

export default Card;
