import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import { toggleSideBar, selectItem, sidebarSelector } from './sidebarSlice';
import './Sidebar.module.scss';
import { HomeOutlined, ScheduleOutlined, FileOutlined, UnorderedListOutlined , SettingOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const menuItems = [
  {key: '1', title: 'Home', icon: HomeOutlined},
  {key: '2', title: 'Conferences', icon: ScheduleOutlined},
  {key: '3', title: 'Requests', icon: FileOutlined},
  {key: '4', title: 'Submissions', icon: UnorderedListOutlined},
  {key: '5', title: 'Settings', icon: SettingOutlined}
];


const Sidebar = () => {
  const dispatch = useDispatch();
  const { collapsed, selectedItem } = useSelector(sidebarSelector);


  const handleCollapse = (collapsed) => {
    dispatch(toggleSideBar(collapsed));
  };

  const handleMenuClick = (item) => {
    dispatch(selectItem(item.key));
  };

  return (
    <Sider className="sidebar" collapsible collapsed={collapsed} onCollapse={handleCollapse}>
      <Menu
          theme="dark"
          mode="inline"
          onClick={handleMenuClick}
          selectedKeys={[selectedItem]}
          items={menuItems.map(
            (item) => ({
              key: item.key,
              label: item.title,
              icon: React.createElement(item.icon),
            }),
          )}
        />
    </Sider>
  );
};

export default Sidebar;
