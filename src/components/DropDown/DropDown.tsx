// interface DropdownProps {
//   add: Function;
//   create: Function | undefined;
//   mappable: any[] | undefined; //Tags or Categories
//   card: CardProps['card'];
//   variant: 'tags' | 'categories';
// }

// const Dropdown = (props: DropdownProps) => {
//   return (
//     <div
//       className="bg-black w-full h-10 z-50"
//       onClick={e => {
//         e.stopPropagation();
//       }}
//     >
//       <Input
//         id="NewCategoryInput"
//         variant="secondary"
//         placeholder={
//           props.variant === 'tags' ? 'Add new tag!' : 'Add new category!'
//         }
//         type="text"
//         autoComplete="off"
//         onChange={() => {}}
//         onBlur={e => {
//           if (e.target.value === '') return;

//           if (props.create)
//             props.create(e.target.value) && console.log('jajajaj');
//           else console.log('Card component missing createCategory prop.');
//           //här ska egentligen addTagswindow togglas bort
//         }}
//         onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
//           console.log('Key pressed: ', e.key);
//           if (e.key === 'Enter') {
//             const input = e.target as HTMLInputElement;
//             if (input.value === '') return;
//             if (props.create) {
//               props.create(input.value);
//               console.log(input.value);
//               console.log('BORDE LÄGGAS TILL');
//             } else {
//               console.log('Card component missing createCategory prop.');
//             }
//             //här ska egentligen addTagswindow togglas bort
//           }
//         }}
//       />
//       {props.mappable?.map(object => {
//         if (props.variant === 'tags') {
//           const tagExistsOnCard = props.card.tags.find(cardTag => {
//             if (cardTag.id === object.id) return true;
//             return false;
//           });
//           if (tagExistsOnCard) return null;
//         }
//         return (
//           <div
//             className="w-auto h-auto bg-black"
//             onClick={e => {
//               e.stopPropagation();
//               props.add(object.id);
//             }}
//             key={object.id}
//           >
//             <Text content={object.name} variant="p-primary" textColor="white" />
//           </div>
//         );
//       })}

//       {/* <h1
//         className=" bg-red-200"
//         onClick={() => {
//           if (props.create) props.create();
//           else console.log('Card component missing createTag prop.');
//         }}
//       >
//         {props.variant === 'tags' ? 'Add new tag!' : 'Add new category!'}
//       </h1> */}
//     </div>
//   );
// };
