let _uuid = 0;
import _ from 'lodash';
import { useCallback } from 'react';

export const appendNode = (pnode, node) => {
  if (!pnode || !node) return;
  pnode.children = _.isArray(pnode.children) ? pnode.children : [];
  if (!node.nid) {
    node.nid = 'nid_' + uuid();//注意：生成"nid"属性
  }
  pnode.children.push(node);
}

export const uuid = () => {
  return Date.now() + '_' + _uuid++;
}
