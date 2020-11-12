import React from 'react';
import { IRouteComponentProps } from 'umi';
import styles from './index.less';

export default (props: IRouteComponentProps) => {
  return (
    <>
      <div className={styles.container}>
        <a href="#">
          <div>
            LOGO
          </div>
        </a>
        <div className={styles.navs}></div>
      </div>
      { props.children }
    </>
  );
}
