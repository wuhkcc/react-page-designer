
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { UIMetaType } from './service';

export interface DesignerModelState {
  uimetas: UIMetaType[];
}

export interface DesignerModelType {
  namespace: 'designer';
  state: DesignerModelState;
  effects: {
    // query: Effect;
  };
  reducers: {
    setup: Reducer<DesignerModelState>;
  };
  subscriptions: { setup: Subscription };
}

const DesignerModel: DesignerModelType = {
  namespace: 'designer',
  state: {
    uimetas: [{
      uikey: 'page',
      uititle: '根页面',
      uitype: 'YYPage',
      nid: 'nid_1583290572604_156',
      children: [{
        uititle: '按钮1',
        uitype: 'ButtonWidget',
        nid: 'nid_1601261409067_0',
        uikey: 'btn1',
        title: '按钮1',
        ghost: false,
        visible: true,
        disabled: false,
        danger: false,
        block: false,
      }],
    }]
  },

  effects: {
    // *query({ payload }, { call, put }) {
    // },
  },
  reducers: {
    setup(state, action) {
      console.log({
        ...state,
        ...action.payload,
      })
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/designer') {
          dispatch({
            type: 'setup',
          })
        }
      });
    }
  }
};

export default DesignerModel;
