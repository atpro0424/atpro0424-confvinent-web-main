import React from 'react';
import { useDispatch } from 'react-redux';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { toggleSidebar ,  updateSelectedItem} from '../../redux/sidebar/sidebarActions';
import styles from './Sidebar.module.css';
import { HomeOutlined, ScheduleOutlined, FileOutlined, UnorderedListOutlined , SettingOutlined } from '@ant-design/icons';
import ContentHome from '../Content/ContentHome';
import ContentConferences from '../Content/ContentConferences';
import ContentRequests from '../Content/ContentRequests';
import ContentSubmissions from '../Content/ContentSubmissions';
import ContentSettings from '../Content/ContentSettings';

const { Sider } = Layout;

const menuItems = [
  {key: '1', title: 'Home', component: ContentHome , icon: HomeOutlined},
  {key: '2', title: 'Conferences', component: ContentConferences , icon: ScheduleOutlined},
  {key: '3', title: 'Requests', component: ContentRequests, icon: FileOutlined},
  {key: '4', title: 'Submissions', component: ContentSubmissions,  icon: UnorderedListOutlined},
  {key: '5', title: 'Settings', component: ContentSettings , icon: SettingOutlined}
];


const Sidebar = ({ collapsed }) => {
  const dispatch = useDispatch();

  const handleCollapse = (collapsed) => {
    dispatch(toggleSidebar(collapsed));
  };

  const handleMenuClick = (item) => {
    const menuItem = menuItems.find((menuItem) => menuItem.key === item.key);
    dispatch(updateSelectedItem(menuItem.key, menuItem.title, menuItem.content));
  };

  return (
    <Sider className={styles.sidebar} collapsible collapsed={collapsed} onCollapse={handleCollapse}>
      <Menu
          theme="dark"
          mode="inline"
          onClick={handleMenuClick}
          defaultSelectedKeys={['1']}
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

const mapStateToProps = (state) => ({
  collapsed: state.sidebar.collapsed,
});


export default connect(mapStateToProps)(Sidebar);
