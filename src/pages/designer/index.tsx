import React from 'react';
import { connect } from 'umi';
import { Tabs } from 'antd';

import { LibsBox } from './components/LibsBox';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './components/Board';
import styles from './style.less';

interface MainPanelStates {
  uimetas: any
}

function MainPanel() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.designer}>
        <div className={styles.leftPanel}>
        <Tabs tabPosition="right" type="card" animated={false}>
            <Tabs.TabPane tab="组件库" key="1">
              <LibsBox libItems={libItems}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="页面列表" key="2"></Tabs.TabPane>
            <Tabs.TabPane tab="我的组件" key="3"></Tabs.TabPane>
          </Tabs>
        </div>
        <div className={styles.middlePanelBox}>
          <Board/>
        </div>
      </div>
    </DndProvider>
  );
};

// export default connect(mapStateToProps)(MainPanel);
export default MainPanel;
export const libItems = [{
  type: 'button',
  label: '按钮'
},{
  type: 'button',
  label: '按钮'
},{
  type: 'button',
  label: '按钮'
},{
  type: 'button',
  label: '按钮'
},{
  type: 'button',
  label: '按钮'
}]
