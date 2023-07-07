import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, ConfigProvider, Avatar, Dropdown } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getPrivilegeThunk, logoutThunk, userSelector } from './redux/rootSlice';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content/Content';
import Home from './modules/Home/Home';
import Conferences from './modules/Conferences/Conferences';
import Requests from './modules/Requests/Requests';
import Submissions from './modules/Submissions/Submissions';
import Reviews from './modules/Reviews/Reviews';
import Settings from './modules/Settings/Settings';
import Superadmin from './modules/Superadmin/Superadmin';
import './App.scss';
const { Header } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  
  useEffect(() => {
    dispatch(getPrivilegeThunk());
  }, [dispatch])

  const renderContent = (selectedItem) => {
    switch (selectedItem) {
      case 'home':
        return <Home />;
      case 'conference':
        return <Conferences />;
      case 'requests':
        return <Requests />;
      case 'reviews':
        return <Reviews />;
      case 'submissions':
        return <Submissions />;
      case 'settings':
        return <Settings />;
      case 'superadmin':
        return <Superadmin />;
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
      case 'reviews':
        return 'Reviews';
      case 'settings':
        return "Settings";
      case 'superadmin':
        return 'Super Admin';
      default:
        return "Home";
    }
  }

  const avatarMenu = [
    {
      key: 'logout',
      label: (
        <a onClick={(e) => {
          e.preventDefault();
          dispatch(logoutThunk());
        }}>Sign Out</a>
      )
    }
  ];

  const content = (selectedItem) => {
    return (
      <Layout>
        <Header className="header">
          <div>{renderTitle(selectedItem)}</div>
          <Dropdown placement="bottomRight" menu={{ items: avatarMenu }}>
            <Avatar className="avatar">{user}</Avatar>
          </Dropdown>
        </Header>
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
            {/* <Route path='/main/requests' element={ content('requests') } /> */}
            <Route path='/main/submissions' element={ content('submissions') } />
            <Route path='/main/reviews' element={ content('reviews') } />
            <Route path='/main/settings' element={ content('settings') } />
            <Route path='/main/superadmin' element={ content('superadmin') } />
            <Route path='*' element={<Navigate to='/main/home' />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
