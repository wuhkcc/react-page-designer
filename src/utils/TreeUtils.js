'use strict';

/*树结构数据的相关操作工具方法*/
import _ from 'lodash';
import toArray from 'rc-util/lib/Children/toArray';

function getChildrenlength(children) {
  var len = 1;
  if (Array.isArray(children)) {
    len = children.length;
  }
  return len;
}

function getSiblingPosition(index, len, siblingPosition) {
  if (len === 1) {
    siblingPosition.first = true;
    siblingPosition.last = true;
  } else {
    siblingPosition.first = index === 0;
    siblingPosition.last = index === len - 1;
  }
  return siblingPosition;
}

var TreeUtils = {
  /**
   * 遍历树结构子集对象
   * @param childs  {array} 需要遍历的树结构
   * @param callback {function} 遍历时的回调函数，传递参数：
   *   item(当前节点)
   *              index(同级节点之间的索引)
   *              pos(父子节点层级和索引)
   *              key(当前节点键值)
   *              siblingPos(兄弟节点间的开始first与结束last标识)
   *              parent(父节点)
   * @param parent {object} 当前父级节点
   */
  loopAll: function loopAll(childs, callback, parent) {
    var loop = function loop(children, level, _parent) {
      var len = getChildrenlength(children);
      _.forEach(children, function(item, index) {
        var pos = level + '-' + index;
        if (item) {
          if (_.isArray(item.children)) {
            loop(item.children, pos, { node: item, pos: pos });
          }
          callback(item, index, pos, item.key || pos, getSiblingPosition(index, len, {}), _parent);
        }
      });
    };
    loop(childs, 0, parent);
  },
  /**
   * 查找树节点下指定节点属性值匹配的节点
   * @param nodes {array} 子节点集合
   * @param propName {string} 属性名
   * @param propValue {*} 属性值
   * @param loop{boolean} 默认：true，是否递归遍历子集合
   * @param only{boolean} 默认：true，是否匹配到第一个就终止
   * @param childPropName{boolean} 默认：children，子节点集合的属性名
   */
  findWithPropName: function findWithPropName(nodes, propName, propValue, loop, only, childPropName) {
    var _results = [];
    var _nodes = _.isArray(nodes) ? nodes : [];
    var _childPropName = childPropName ? childPropName : 'children';
    for (var i = 0; i < _nodes.length; i++) {
      var node = _nodes[i];
      if (!_.isObject(node)) continue;
      if (node[propName] && node[propName] == propValue) {
        _results.push(node);
        if (only == undefined || only == true) break;
      }
      if (loop != false && node[_childPropName] && node[_childPropName].length > 0) {
        var currResults = this.findWithPropName(node[_childPropName], propName, propValue, loop, only, _childPropName);
        if (currResults != null) {
          _results = _results.concat(currResults);
        }
      }
    }
    return _results;
  },
  /**
   * 移除树节点下指定节点属性值匹配的节点
   * @param tree {object} 子节点集合
   * @param propName {string} 属性名
   * @param propValue {*} 属性值
   * @param loop{boolean} 默认：true，是否递归遍历子集合
   * @param childName 子集合的属性名
   */
  removeWithPropName: function removeWithPropName(tree, propName, propValue, loop) {
    var childName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'children';

    var doLoop = function doLoop(data, propName, propVal, callback) {
      _.forEach(data, function(item, index, arr) {
        if (item && item[propName] === propVal) {
          return callback(item, index, arr);
        }
        if (item && loop != false && _.isArray(item[childName])) {
          return doLoop(item[childName], propName, propVal, callback);
        }
      });
    };
    if (tree && propName && propValue) {
      doLoop(_.isArray(tree) ? tree : [tree], propName, propValue, function(item, index, arr) {
        arr.splice(index, 1);
      });
    }
    return tree;
  },
  /**
   * 通过ID查找树节点
   * @param nodes {array} 子节点集合
   * @param idValue {*} ID属性值
   */
  findById: function findById(nodes, idValue) {
    var results = this.findWithPropName(nodes, 'id', idValue, true, true);
    return results.length > 0 ? results[0] : null;
  },
  /**
   * 删除树下对应ID的节点
   * @param tree {object} 树结构对象
   * @param nodeId {*} 树节点id
   */
  removeById: function removeById(tree, nodeId) {
    var tree = this.removeWithPropName(tree, 'id', nodeId, true);
    return tree;
  },
  //递归遍历树数据，其中参数tree为数组
  loopTreeData: function loopTreeData(tree, callback) {
    var _this = this;
    _.forEach(tree, function(item, index, arr) {
      if (item && _.isArray(item.children)) {
        _this.loopTreeData(item.children, callback);
      }
      callback(item, index, arr);
    });
  },
  //依据nid查找当前节点的父节点
  findParentNode: function findParentNode(tree, nodeId) {
    if (_.isEmpty(tree) || !nodeId) return;
    var pNode = null;
    this.loopTreeData(_.isArray(tree) ? tree : [tree], function(item) {
      //找到第一个父级节点就不再匹配
      if (pNode == null && item && _.isArray(item.children)) {
        var isParent = _.some(item.children, function(child) {
          return child.nid === nodeId; //注意：匹配"nid"属性
        });
        if (isParent) pNode = item;
      }
    });
    return pNode;
  },
  /**
   * 依据id查找当前节点的所有父节点对象
   * @param tree 树结构数据
   * @param nodeId 节点的id
   * @param nodeIdKey  作为节点id的属性名，默认为"id"
   * @return array 越接近对应节点的父级排列在最后面(即数组第一位为父级根节点)
   */
  findAllParents: function findAllParents(tree, nodeId) {
    var nodeIdKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';

    if (_.isEmpty(tree) || !nodeId) return [];
    var treeArr = _.isArray(tree) ? tree : [tree];
    var positionList = []; //所有节点位置集合
    var positionMap = {}; //所有节点位置与节点信息的关系
    var currPosition = null; //当前节点位置
    var currPositionNode = null; //当前节点信息
    //遍历树结构获取相关坐标信息
    TreeUtils.loopAll(treeArr, function(item, idx, pos) {
      positionList.push(pos);
      positionMap[pos] = item;
      if (item[nodeIdKey] === nodeId) {
        //记录当前匹配节点的坐标
        currPosition = pos;
        currPositionNode = item;
      }
    });
    var parentNodes = [];
    if (currPosition) {
      var arrayPos = currPosition.split('-');
      var parentPos = '';
      for (var i = 0; i < arrayPos.length - 1; i++) {
        parentPos = i === 0 ? arrayPos[i] : parentPos + '-' + arrayPos[i]; //获取匹配节点的所有父级节点的坐标
        var parentNode = positionMap[parentPos]; //获取对应父节点的信息
        if (parentNode) parentNodes.push(parentNode);
      }
    }
    return parentNodes;
  },

  convertTreeToData: function(rootNodes) {

    function isTreeNode(node) {
      return node && node.type && node.type.isTreeNode;
    }
    function dig(node) {
      const treeNodes = toArray(node);
      return treeNodes
        .map(treeNode => {
          // Filter invalidate node
          if (!isTreeNode(treeNode)) {
            warning(!treeNode, 'Tree/TreeNode can only accept TreeNode as children.');
            return null;
          }

          const { key } = treeNode;
          const { children, ...rest } = treeNode.props;

          const dataNode = {
            key,
            ...rest,
          };

          const parsedChildren = dig(children);
          if (parsedChildren.length) {
            dataNode.children = parsedChildren;
          }

          return dataNode;
        })
        .filter((dataNode) => dataNode);
    }

    return dig(rootNodes);
  },
};

export default TreeUtils;
