import React from 'react';
import styles from './LibItem.less';
import { DragSource, DragSourceMonitor, useDrag } from 'react-dnd'

export interface LibItemProps {
  type: string,
  label: string,
}

export const ItemTypes = {
  COMPONENT: 'component',
}

const ComponentSource = {
  beginDrag(props: LibItemProps) {
    // Return the data describing the dragged item
    const item = { type: props.type }
    return item
  },

  endDrag(props: LibItemProps, monitor: DragSourceMonitor, component: any) {
    if (!monitor.didDrop()) {
      return
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    // CardActions.moveCardToList(item.id, dropResult.listId)

  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect: any, monitor: any) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  }
}

function LibItem(props: any) {
  // Your component receives its own props as usual
  // These two props are injected by React DnD,
  // as defined by your `collect` function above:
  const { type, label, isDragging, connectDragSource } = props
  return connectDragSource(
    <div className={styles.libItem}>
      <div className="lib-img"></div>
      <p>{props.label}</p>
    </div>
  )
}

// Export the wrapped version
export const DragLibItem = DragSource(ItemTypes.COMPONENT, ComponentSource, collect)(LibItem)
