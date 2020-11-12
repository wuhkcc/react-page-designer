import React from 'react';
import { LibItemProps, DragLibItem } from './LibItem';
import styles from './LibsBox.less';

export function LibsBox(props: { libItems: LibItemProps[] }): JSX.Element {
  const { libItems } = props;
  return (
    <div className={styles.libsBox}>
      {libItems.map((item, index) => {
        return <DragLibItem key={index} label={item.label} type={item.type} />;
      })}
    </div>
  );
}
