import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useHref } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { toggleSideBar, sidebarSelector } from './sidebarSlice';
import './Sidebar.scss';
import { HomeOutlined, ScheduleOutlined, FileOutlined, UnorderedListOutlined , SettingOutlined, TeamOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const menuItems = [
  { key: 'home', title: 'Home', icon: <HomeOutlined /> },
  { key: 'conferences', title: 'Conferences', icon: <ScheduleOutlined /> },
  { key: 'requests', title: 'Requests', icon: <FileOutlined /> },
  { key: 'submissions', title: 'Submissions', icon: <UnorderedListOutlined /> },
  { key: 'settings', title: 'Settings', icon: <SettingOutlined /> },
  { key: 'superadmin', title: 'Super Admin', icon: <TeamOutlined /> },
];


const Sidebar = () => {
  const href = useHref();
  const hrefParts = href.split('/');
  const defaultKey = hrefParts.length > 2 ? hrefParts[2] : 'home';

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { collapsed } = useSelector(sidebarSelector);

  const handleCollapse = (collapsed) => {
    dispatch(toggleSideBar(collapsed));
  };

  const handleMenuClick = (item) => {
    navigate(`/main/${item.key}`);
  };

  return (
    <Sider className="sidebar" collapsible collapsed={collapsed} onCollapse={handleCollapse}>
      <Menu
          className="sidebar_menu"
          mode="inline"
          onClick={handleMenuClick}
          defaultSelectedKeys={[defaultKey]}
          items={menuItems.map(
            (item) => ({
              key: item.key,
              label: item.title,
              icon: item.icon,
            }),
          )}
        />
    </Sider>
  );
};

export default Sidebar;
