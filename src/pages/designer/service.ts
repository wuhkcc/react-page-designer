export interface UIMetaType {
  uikey: string;
  uititle: string;
  uitype: string;
  nid: string;
  children: [
    {
      uititle: string;
      uitype: string;
      nid: string;
      uikey: string;
      title: string;
      ghost: boolean;
      visible: boolean;
      disabled: boolean;
      danger: boolean;
      block: boolean;
    },
  ];
}
