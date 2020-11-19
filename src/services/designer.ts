export interface UIMetaType {
  uikey: string;
  uititle: string;
  uitype: string;
  nid: string;
  children: {
    uititle: string;
    uitype: string;
    nid: string;
    uikey: string;
    title: string;
    ghost: string;
    visible: string;
    disabled: string;
    danger: string;
    block: string;
  }[];
}

export const ItemTypes = {
  LIB_ITEM: 'libItem',
  DROPPED_ITEM: 'droppedItem'
};

export const defaultUiMetas: UIMetaType = {
  uikey: 'page',
  uititle: '根页面',
  uitype: 'YYPage',
  nid: 'nid_1583290572604_156',
  children: [
    {
      uititle: '按钮1',
      uitype: 'ButtonWidget',
      nid: 'nid_1601261409067_0',
      uikey: 'btn1',
      title: '按钮1',
      ghost: 'false',
      visible: 'true',
      disabled: 'false',
      danger: 'false',
      block: 'false',
    },
  ],
};
