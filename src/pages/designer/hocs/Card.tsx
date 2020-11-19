import { ItemTypes } from '@/services/designer'
import { useRef } from 'react'
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd'
import React from 'react';
import { DefaultParser } from '@/utils/parser';

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
  id: string;
  moveCard?: (a: number, b: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const Card = (props: Partial<ContainerItemType>) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isOverCurrent }, drop] = useDrop({
    accept: [ItemTypes.LIB_ITEM, ItemTypes.DROPPED_ITEM],
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (item.type === ItemTypes.LIB_ITEM) {
        return
      }
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = props.index

      if(hoverIndex === dragIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      // if (!hoverIndex) {
      //   return
      // }
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      if (props.moveCard) {

        props.moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
        item.index = hoverIndex
      }
    },
    collect: monitor => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.DROPPED_ITEM, ...props },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const renderWithUiType = (uitype: string) => {
    const Component = DefaultParser[uitype];
    return <Component />
  }

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  console.log('props', props);
  return (
    <div ref={ref} style={{opacity}} >
      {props.uitype ? renderWithUiType(props.uitype) : 'null component'}
    </div>
  )
}

export default Card;
const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move"
};
