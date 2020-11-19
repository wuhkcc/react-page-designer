// import React, { useCallback, useState } from 'react';
// import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
// import { connect, Dispatch } from 'umi';
// import { defaultUiMetas, ItemTypes, UIMetaType } from '../../../services/designer';
// import _ from 'lodash';
// import './Board.less';

// interface BoardProps {
//   rcViews: [];
//   uiMeta: [];
//   dispatch: Dispatch;
// }

// const Board: React.FC<BoardProps> = ({ rcViews, dispatch }) => {

//   const [uiMeta, setUiMeta] = useState([
//     {
//       uititle: '按钮1',
//       uitype: 'ButtonWidget',
//       nid: 'nid_1601261409067_0',
//       uikey: 'btn1',
//       title: '按钮1',
//       ghost: 'false',
//       visible: 'true',
//       disabled: 'false',
//       danger: 'false',
//       block: 'false',
//     },
//   ]);

//   const moveCard = useCallback(
//     (dragIndex: number, hoverIndex: number) => {
//       const dragCard = cards[dragIndex]
//       setCards(
//         update(cards, {
//           $splice: [
//             [dragIndex, 1],
//             [hoverIndex, 0, dragCard],
//           ],
//         }),
//       )
//     },
//     [cards],
//   )

//   const [{ isOver, isCurrentOver }, drop] = useDrop({
//     accept: ItemTypes.LIBITEM,
//     drop(item, monitor) {
//       if (!item.nid) {
//         dispatch({ type: 'designer/update', payload: item });
//       }
//     },
//     collect: monitor => ({
//       isOver: monitor.isOver(),
//       isCurrentOver: monitor.isOver({ shallow: true }),
//     }),
//   });

//   return (
//     <div ref={drop} className="boardWrarper">
//       <div className={`board ${isCurrentOver ? 'dragOver' : ''}`}>

//       </div>
//     </div>
//   );
// };

// // const moveCmpnt = useCallback(
// //   (dragIndex: number, hoverIndex: number) => {
// //     const dragCard = cards[dragIndex]
// //     setCards(
// //       update(cards, {
// //         $splice: [
// //           [dragIndex, 1],
// //           [hoverIndex, 0, dragCard],
// //         ],
// //       }),
// //     )
// //   },
// //   [cards],
// // )

// function mapStateToProps(state: any) {
//   const { rcViews } = state.designer;
//   return {
//     rcViews,
//   };
// }

// export default connect(mapStateToProps)(Board);
