import React from 'react';
import styles from './LibItem.less';

export interface LibItemProps {
  uititle: string;
  uitype: string;
}

const LibItem: React.FC<LibItemProps> = ({ uitype, uititle }) => {

  return (
    <div className={styles.libItem}>
      <div className="lib-img"></div>
      <p>{uititle}</p>
    </div>
  );
};

export default LibItem;
