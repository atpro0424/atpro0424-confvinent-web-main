import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useHref } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { privilegeSelector } from '../../redux/rootSlice';
import { toggleSideBar, sidebarSelector } from './sidebarSlice';
import './Sidebar.scss';
import {
  HomeOutlined,
  ScheduleOutlined,
  FileOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  TeamOutlined,
  EditOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const menuItems = [
  { key: 'home', title: 'Home', icon: <HomeOutlined />, privilegeGroup: ['user', 'member', 'admin', 'superadmin'] },
  { key: 'conferences', title: 'Conferences', icon: <ScheduleOutlined />, privilegeGroup: ['admin'] },
  { key: 'requests', title: 'Requests', icon: <FileOutlined />, privilegeGroup: ['member', 'admin'] },
  { key: 'reviews', title: 'Reviews', icon: <EditOutlined />, privilegeGroup: ['member', 'admin'] },
  { key: 'submissions', title: 'Submissions', icon: <UnorderedListOutlined />, privilegeGroup: ['user', 'member', 'admin'] },
  { key: 'settings', title: 'Settings', icon: <SettingOutlined />, privilegeGroup: ['admin'] },
  { key: 'superadmin', title: 'Super Admin', icon: <TeamOutlined />, privilegeGroup: ['superadmin'] },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { collapsed } = useSelector(sidebarSelector);
  const { privilege } = useSelector(privilegeSelector);
  const href = useHref();

  const hrefParts = href.split('/');
  let selectedKey = 'home';

  if (hrefParts.length > 2) {
    if (menuItems.find(val => val.key === hrefParts[2])) {
      selectedKey = hrefParts[2];
    }
  }

  useEffect(() => {
    if (privilege !== null && !menuItems.find(el => el.key === selectedKey).privilegeGroup.includes(privilege)) {
      navigate('/main/home');
    }
  }, [navigate, privilege, selectedKey])

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
          selectedKeys={[selectedKey]}
          items={menuItems.map(
            (item) => (item.privilegeGroup.includes(privilege) ? {
              key: item.key,
              label: item.title,
              icon: item.icon,
            } : undefined),
          )}
        />
    </Sider>
  );
};

export default Sidebar;
