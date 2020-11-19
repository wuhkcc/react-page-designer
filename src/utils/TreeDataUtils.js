import _ from 'lodash';
import TreeUtils from './TreeUtils';

var _uuid = 0;

var TreeDataUtils = {
  uuid: function uuid() {
    return Date.now() + '_' + _uuid++;
  },
  //查找树节点下指定nid的节点,loop-是否递归遍历子集合，默认：true
  findNode: function(nodes, nodeId, loop = true, only = true) {
    var results = TreeUtils.findWithPropName(nodes, 'nid', nodeId, loop, only);//注意：匹配"nid"属性
    return results.length > 0 ? results[0] : null;
  },
  findNodeByUiKey: function(nodes, uikey, loop = true, only = true) {
    var results = TreeUtils.findWithPropName(nodes, 'uikey', uikey, loop, only);//注意：匹配"uikey"属性
    return results.length > 0 ? results[0] : null;
  },
  findNodeByUiType: function(nodes, uitype) {
    var results = TreeUtils.findWithPropName(nodes, 'uitype', uitype, true, true);//注意：匹配"uitype"属性
    return results.length > 0 ? results[0] : null;
  },
  //依据删除树下对应nid的节点
  removeNode: function(tree, nodeId) {
    var tree = TreeUtils.removeWithPropName(tree, 'nid', nodeId);//注意：匹配"nid"属性
    return tree;
  },
  //依据nid查找当前节点的父节点
  findParentNode: function(tree, nodeId) {
    if (_.isEmpty(tree) || !nodeId) return;
    var pNode = null;
    this.loopTreeData(_.isArray(tree) ? tree : [tree], function(item) {
      //找到第一个父级节点就不再匹配
      if (pNode == null && item && _.isArray(item.children)) {
        var isParent = _.some(item.children, function(child) {
          return child.nid === nodeId;//注意：匹配"nid"属性
        });
        if (isParent) pNode = item;
      }
    });
    return pNode;
  },
  // 依据nid查找当前对象在树中的位置
  getObjPath: function(tree, node, path) {
    if (!node) return;
    var parentNode = this.findParentNode(tree, node.nid);
    var children = parentNode && _.isArray(parentNode.children) ? parentNode.children : [];
    _.forEach(children, function(child, index) {
      if (child.nid == node.nid) {
        path = `children[${index}]` + path;
      }
    });
    if (parentNode == tree) {
      return path;
    } else {
      return this.getObjPath(tree, parentNode, path);
    }
  },
  //给指定节点追加一个子节点，nid未指定则自动生成一个唯一nid
  appendNode: function(pnode, node) {
    if (!pnode || !node) return;
    pnode.children = _.isArray(pnode.children) ? pnode.children : [];
    if (!node.nid) {
      node.nid = 'nid_' + this.uuid();//注意：生成"nid"属性
    }
    pnode.children.push(node);
  },
  //重新生成新的节点nid
  generateNodeId: function(node) {
    const _this = this;
    this.loopTreeData([node], function(item, index, arr) {
      item.nid = 'nid_' + _this.uuid();//注意：生成"nid"属性;
    });
  },
  //如果节点的nid属性不存在，则生成nid属性
  ifNotGenerateNodeId: function(node) {
    const _this = this;
    var count = 0;
    this.loopTreeData([node], function(item, index, arr) {
      if (!item.nid) {
        count = count + 1;
        item.nid = 'nid_' + _this.uuid();//注意：生成"nid"属性;
      }
    });
    if (count > 0) {
      console.warn('有' + count + '个节点nid不存在，已重新生成!');
    }
    return count;
  },
  //递归遍历树数据，其中参数tree为数组
  loopTreeData: function(tree, callback) {
    var _this = this;
    _.forEach(tree, function(item, index, arr) {
      if (item && _.isArray(item.children)) {
        _this.loopTreeData(item.children, callback);
      }
      callback(item, index, arr);
    });
  },
};

export default TreeDataUtils;
