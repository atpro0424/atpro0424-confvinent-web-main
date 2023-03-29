import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import styles from './Content.module.css';

const { Content: AntContent } = Layout;

const Content = ({ title, children}) => {
    return (
      <AntContent className={styles.content}>
        <div className={styles.container}>
          {children}
        </div>
      </AntContent>
    );
};

const mapStateToProps = (state) => ({
  title: state.sidebar.title,
  selectedItem: state.sidebar.selectedItem,
});

export default connect(mapStateToProps)(Content);
