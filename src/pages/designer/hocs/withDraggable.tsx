import React, { useRef } from 'react';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { ItemTypes } from '@/services/designer';
import { LibItemProps } from '../components/LibItem';
import * as _ from 'lodash';
import './styles.less';

export interface DraggableProps {
  index: number
  moveCard?: (a: number, b: number) => void
}

const withDraggableElement = (WrappedComponent: React.FC<LibItemProps>, props: LibItemProps) => {
  return function() {

    const ref = useRef<HTMLDivElement>(null)

    const [, drag] = useDrag({
      item: { type: ItemTypes.LIB_ITEM, ...props },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })


    drag(ref)
    return (
      <div ref={ref} className='draggable'>
        <WrappedComponent {...props}/>
      </div>
    )
  }
}

export default withDraggableElement;
