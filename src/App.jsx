import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content/Content';
import Home from './modules/Home/Home';
import Conferences from './modules/Conferences/Conferences';
import Requests from './modules/Requests/Requests';
import Submissions from './modules/Submissions/Submissions';
import Settings from './modules/Settings/Settings';
import './App.scss';
const { Header } = Layout;

const App = () => {
  const renderContent = (selectedItem) => {
    switch (selectedItem) {
      case 'home':
        return <Home />;
      case 'conference':
        return <Conferences />;
      case 'requests':
        return <Requests />;
      case 'submissions':
        return <Submissions />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  const renderTitle = (selectedItem) => {
    switch (selectedItem) {
      case 'home':
        return "Home";
      case 'conference':
        return "Conferences";
      case 'requests':
        return "Requests";
      case 'submissions':
        return "Submissions";
      case 'settings':
        return "Settings";
      default:
        return "Home";
    }
  }

  const content = (selectedItem) => {
    return (
      <Layout>
        <Header className="header">{renderTitle(selectedItem)}</Header>
        <Content>{renderContent(selectedItem)}</Content>
      </Layout>
    );
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7286D3',
        },
      }}
    >
      <Layout className="layout">
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path='/main/home' element={ content('home') } />
            <Route path='/main/conferences' element={ content('conference') } />
            <Route path='/main/requests' element={ content('requests') } />
            <Route path='/main/submissions' element={ content('submissions') } />
            <Route path='/main/settings' element={ content('settings') } />
            <Route path='*' element={<Navigate to='/main/home' />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
