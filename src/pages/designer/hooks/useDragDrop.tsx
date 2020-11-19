import { ItemTypes } from '@/services/designer';
import { uuid } from '@/utils/tree-helper';
import { useMemo, useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

interface ContainerItemType {
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
}

export default function useDragDrop(list: Partial<ContainerItemType>[]) {
  const [dragList, setDragList] = useState(list);
  const heights = useMemo(() => [], []);

  const [{ isOver, isCurrentOver }, drop] = useDrop({
    accept: ItemTypes.LIB_ITEM,
    drop(item: ContainerItemType, monitor: DropTargetMonitor) {
      item.nid = uuid();
      console.log("dropped")
      item.type = "DROPED";
      const newList = dragList.concat([item])
      setDragList(newList);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isCurrentOver: monitor.isOver({ shallow: true }),
    }),
  });

  return {
    dragList,
    heights
  }
}
