import React from 'react';
import { Tabs } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './style.less';
import { ItemTypes } from '../../services/designer';
import LibItem from './components/LibItem';
import withDraggableElement from './hocs/withDraggable';
import YYPage from './components/YYPage';
import Container from './hocs/Container';

function MainPanel() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.designer}>
        <div className={styles.leftPanel}>
          <Tabs tabPosition="right" type="card" animated={false}>
            <Tabs.TabPane tab="组件库" key="1">
              <div className={styles.libsBox}>
                {libItems.map(item => {
                  const DraggableElement = withDraggableElement(LibItem, item);
                  return <DraggableElement key={item.uitype}/>;
                })}
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="页面列表" key="2"></Tabs.TabPane>
            <Tabs.TabPane tab="我的组件" key="3"></Tabs.TabPane>
          </Tabs>
        </div>
        <div className={styles.middlePanelBox}>
          <YYPage>
            <Container initList={[]}/>
          </YYPage>
        </div>
      </div>
    </DndProvider>
  );
}

export default MainPanel;
export const libItems = [
  {
    type: ItemTypes.LIB_ITEM,
    uitype: 'ButtonWidget',
    uititle: '按钮',
  },
  {
    type: ItemTypes.LIB_ITEM,
    uitype: 'CardWidget',
    uititle: '卡片',
  },
  {
    type: ItemTypes.LIB_ITEM,
    uitype: 'DatePickerViewWidget',
    uititle: '日期选择器',
  },
];
