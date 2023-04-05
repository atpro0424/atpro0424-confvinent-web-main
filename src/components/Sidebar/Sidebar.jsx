import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { toggleSideBar, sidebarSelector } from './sidebarSlice';
import './Sidebar.scss';
import { HomeOutlined, ScheduleOutlined, FileOutlined, UnorderedListOutlined , SettingOutlined , EditOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const menuItems = [
  {key: 'home', title: 'Home', icon: HomeOutlined},
  {key: 'conferences', title: 'Conferences', icon: ScheduleOutlined},
  {key: 'requests', title: 'Requests', icon: FileOutlined},
  {key: 'submissions', title: 'Submissions', icon: UnorderedListOutlined},
  {key: 'settings', title: 'Settings', icon: SettingOutlined},
  {key: 'reviews', title: 'Reviews', icon: EditOutlined}
];


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { collapsed } = useSelector(sidebarSelector);

  const handleCollapse = (collapsed) => {
    dispatch(toggleSideBar(collapsed));
  };

  const handleMenuClick = (item) => {
    navigate(`/main/${item.key}`);
  };

  const getIcon = key => {
    switch(key) {
      case 'home':
        return <HomeOutlined />;
      case 'conferences':
        return <ScheduleOutlined />;
      case 'requests':
        return <FileOutlined />;
      case 'submissions':
        return <UnorderedListOutlined />;
      case 'settings':
        return <SettingOutlined />;
      case 'reviews':
        return <EditOutlined />
      default:
        return <HomeOutlined />;
    }
  }

  return (
    <Sider className="sidebar" collapsible collapsed={collapsed} onCollapse={handleCollapse}>
      <Menu
          className="sidebar_menu"
          mode="inline"
          onClick={handleMenuClick}
          defaultSelectedKeys={['home']}
          items={menuItems.map(
            (item) => ({
              key: item.key,
              label: item.title,
              icon: getIcon(item.key),
            }),
          )}
        />
    </Sider>
  );
};

export default Sidebar;
