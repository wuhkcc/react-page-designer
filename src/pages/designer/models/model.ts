import { appendNode } from '@/utils/tree-helper';
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { UIMetaType, defaultUiMetas } from '../../../services/designer';
import { DefaultParser } from '@/utils/parser';
import { processViews } from '@/utils/renderer';

const updateRcViwsWithUiMeta = (uiMetas?: UIMetaType) => {
  const uiParser = DefaultParser || {};
  const uiEvent = {};
  return processViews({ uiMetas: [uiMetas], uiParser, uiEvent})
}

export interface DesignerModelState {
  rcViews: [];
  uiMeta: UIMetaType;
}

export interface DesignerModelType {
  namespace: 'designer';
  state: DesignerModelState;
  effects: {};
  reducers: {
    setup: Reducer<DesignerModelState>;
    update: Reducer<DesignerModelState>;
  };
  subscriptions: { setup: Subscription };
}

const DesignerModel: DesignerModelType = {
  namespace: 'designer',
  state: {
    rcViews: [],
    uiMeta: defaultUiMetas,
  },
  effects: {},
  reducers: {
    setup(state, action) {
      const rcViews = updateRcViwsWithUiMeta(state?.uiMeta)
      return { ...state, ...action.payload, rcViews };
    },
    update(state, action) {
      const uiMeta = state?.uiMeta;
      appendNode(uiMeta, action.payload);
      const rcViews = updateRcViwsWithUiMeta(uiMeta);
      return { ...state, ...action.payload, rcViews, uiMeta};
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/designer') {
          dispatch({
            type: 'setup',
          });
        }
      });
    },
  },
};

export default DesignerModel;
