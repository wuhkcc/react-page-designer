import React, { CElement, createElement, isValidElement, memo } from 'react';
import _ from 'lodash';
import withDraggableElement from '@/pages/designer/hocs/withDraggable';

const EmptyView = memo(() => {
  return null;
});

export function processViews({uiMetas, uiParser, uiEvent}: any) {
  const uiMetasCopy = _.cloneDeep(uiMetas);
  const views = [];
  for (let i = 0, len = uiMetasCopy && uiMetasCopy.length; i < len; i++) {
    let UIComponent = null;
    let itemEvents = null;
    let itemProps = null;
    const itemUI = uiMetasCopy[i];
    delete uiMetasCopy[i].api;
    if (itemUI.children) {
      itemUI.children = processViews({uiMetas: itemUI.children, uiParser, uiEvent});
    }
    if (itemUI.uikey && uiEvent) {
      itemEvents = uiEvent[itemUI.uikey];
    }
    itemProps = _.assign({}, itemUI);
    if (!UIComponent) {
      UIComponent = itemUI.uitype ? uiParser[itemUI.uitype] : null;
      UIComponent = withDraggableElement(UIComponent, itemProps);
    }
    if (UIComponent && isValidElement(createElement(UIComponent))) {
      const privateProps: any = {};
      if (itemUI.nid) {
        // TODO Legacy API: string Refs
        // https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs
        // privateProps.ref = itemUI.nid;
        if (!itemUI.key) {
          privateProps.key = 'pageCode' + '_' + itemUI.nid;
        }
        const itemViewProps = _.assign({'data-nid': itemUI.nid}, itemProps, privateProps, itemEvents);
        views.push(createElement(UIComponent, itemViewProps, itemUI.children));
      }
    } else {
      views.push(createElement(EmptyView, itemProps));
    }
  }
  return views;
}
