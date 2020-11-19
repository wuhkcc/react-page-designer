import { ItemTypes } from '@/services/designer';
import React, { useCallback, useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import './styles.less';
import update from 'immutability-helper';
import { uuid } from '@/utils/tree-helper';
import Card from './Card';

export interface ContainerItemType {
  uititle: string;
  uitype: string;
  nid: string;
  uikey: string;
  title: string;
  ghost: string;
  visible: string;
  disabled: string;
  danger: string;
  block: string;
  type: string | symbol;
  index: number;
  move: (dragIndex: number, hoveIndex: number) => void;
}

interface ContainerProps {
  initList: Partial<ContainerItemType>[];
}

const Container: React.FC<ContainerProps> = ({ initList }) => {
  const [dragList, setDragList] = useState(initList);

  const [, drop] = useDrop({
    accept: [ItemTypes.LIB_ITEM, ItemTypes.DROPPED_ITEM],
    drop(item: ContainerItemType, monitor: DropTargetMonitor) {
      if (!item.nid) {
        item.nid = uuid();
        item.index = dragList.length;
        item.type = ItemTypes.DROPPED_ITEM;
        const newList = dragList.concat([item]);
        setDragList(newList);
      }
    },
  });

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = dragList[dragIndex];
      setDragList(
        update(dragList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      );
    },
    [dragList],
  );

  const renderCard = (card: ContainerItemType, index: number) => {
    return (
      <Card
        key={card.nid}
        id={card.nid}
        nid={card.nid}
        index={index}
        moveCard={moveCard}
        type={card.type}
        uitype={card.uitype}
        uititle={card.uititle}
      />
    );
  };
  return (
    <div ref={drop} className="boardWrarper">
      <div className="board">
        {dragList.map((dragItem, i) => renderCard(dragItem, i))}
      </div>
    </div>
  );
};

export default Container;
