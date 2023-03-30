import React from 'react';
import { Layout } from 'antd';
import { useSelector} from 'react-redux';
import { keySelector } from './components/Sidebar/sidebarSlice';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content/Content';
import Home from './components/Home/Home';
import Conferences from './components/Conferences/Conferences';
import Requests from './components/Requests/Requests';
import Submissions from './components/Submissions/Submissions';
import Settings from './components/Settings/Settings';
import './App.module.scss';
const { Header } = Layout;

const App = () => {
  const { selectedItem } = useSelector(keySelector);

  const renderContent = () => {
    switch (selectedItem) {
      case '1':
        return <Home />;
      case '2':
        return <Conferences />;
      case '3':
        return <Requests />;
      case '4':
        return <Submissions />;
      case '5':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  const renderTitle = () => {
    switch (selectedItem) {
      case '1':
        return "Home";
      case '2':
        return "Conferences";
      case '3':
        return "Requests";
      case '4':
        return "Submissions";
      case '5':
        return "Settings";
      default:
        return "Home";
    }
  }

  return (
    <Layout className="layout">
      <Sidebar />
      <Layout>
        <Header className="header">{renderTitle()}</Header>
        <Content>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default App;
