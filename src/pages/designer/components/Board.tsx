import React, {isValidElement, createElement, memo, Component, useState, useEffect} from 'react';
import { useDrop, DropTarget, DropTargetMonitor, DropTargetConnector, ConnectDropTarget } from 'react-dnd';
import { ItemTypes } from './LibItem';
// import { defaultUiMeta } from '@/data/lib-items';
import { DefaultParser } from '@/utils/parser';
import { processViews } from '@/utils/renderer';
import _ from 'lodash';
import { connect, DesignerModelState } from 'umi';
import { UIMetaType } from '../service';
const uiParser = DefaultParser || {};
const uiEvent = {};
// const uiMeta = [_.cloneDeep(defaultUiMeta)];


/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const boradTarget = {
  // canDrop(props, monitor) {
  //   // You can disallow drop based on props or item
  //   const item = monitor.getItem()
  //   return canMakeChessMove(item.fromPosition, props.position)
  // },

  hover(props: any, monitor: any, component: any) {
    // // This is fired very often and lets you perform side effects
    // // in response to the hover. You can't handle enter and leave
    // // here—if you need them, put monitor.isOver() into collect() so you
    // // can use componentDidUpdate() to handle enter/leave.

    // // You can access the coordinates if you need them
    // const clientOffset = monitor.getClientOffset()
    // const componentRect = findDOMNode(component).getBoundingClientRect()

    // // You can check whether we're over a nested drop target
    // const isOnlyThisOne = monitor.isOver({ shallow: true })

    // // You will receive hover() even for items for which canDrop() is false
    // const canDrop = monitor.canDrop()
  },

  drop(props: any, monitor: any, component: any) {
    // const uiMeta = [_.cloneDeep(defaultUiMeta)];
  },
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect: DropTargetConnector, monitor: DropTargetMonitor): BoardProps {
  // console.log('drop result', monitor.getDropResult());
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
  }
}

interface BoardProps {
  connectDropTarget: ConnectDropTarget,
  isOver: boolean,
  uiMetas?: UIMetaType
}

class Board extends React.Component<BoardProps, any>{
  // cause always rerender after lib item dragged
  // shouldComponentUpdate(nextProp: BoardProps) {
  //   return false
  // }
  render() {
    const { connectDropTarget, isOver, uiMetas } = this.props
    console.log('Board-uiMetas', uiMetas);
    return connectDropTarget(
      <div style={{
        width: '375px',
        height: '667px',
        backgroundColor: 'rgb(239, 239, 239)',
        margin: '100px auto',
        position: 'relative'
      }}>
        {isOver && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              zIndex: 1,
              opacity: 0.5,
              backgroundColor: 'yellow',
            }}
          />
        )}
        {processViews({uiMetas, uiParser, uiEvent})}
      </div>
    )
  }
}
function mapStateToProps(state: any) {
  const { uimetas } = state.designer;
  console.log('uimetas', uimetas)
  return {
    uiMetas: _.cloneDeep(uimetas)
  }
}
const ConnectedBoard = connect(mapStateToProps)(Board);
export default DropTarget(ItemTypes.COMPONENT, boradTarget, collect)(ConnectedBoard)
