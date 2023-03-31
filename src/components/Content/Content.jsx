import React from 'react';
import { Layout } from 'antd';
import './Content.scss';

const AntContent = Layout.Content;

const Content = ({ children }) => {
    return (
      <AntContent className="content">
        <div className="container">
          {children}
        </div>
      </AntContent>
    );
};

export default Content;
