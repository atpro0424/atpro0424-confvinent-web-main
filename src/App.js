import React from 'react';
import { Layout } from 'antd';
import { Provider , useSelector} from 'react-redux';
import store from './redux/store';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content/Content';
import styles from './App.module.css';
import ContentHome from './components/Content/ContentHome';
import ContentConferences from './components/Content/ContentConferences';
import ContentRequests from './components/Content/ContentRequests';
import ContentSubmissions from './components/Content/ContentSubmissions';
import ContentSettings from './components/Content/ContentSettings';

const { Header } = Layout;

const App = () => {
  const selectedItem = useSelector((state) => state.sidebar.selectedItem);
  console.log(selectedItem);
  const renderContent = () => {
    switch (selectedItem) {
      case '1':
        return <ContentHome />;
      case '2':
        return <ContentConferences />;
      case '3':
        return <ContentRequests />;
      case '4':
        return <ContentSubmissions />;
      case '5':
        return <ContentSettings />;
      default:
        return <ContentHome />;
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
    <Provider store={store}>
      <Layout className={styles.layout}>
        <Sidebar />
        <Layout>
          <Header className={styles.header}>{renderTitle()}</Header>
          <Content>{renderContent()}</Content>
        </Layout>
      </Layout>
    </Provider>
  );
};


export default App;