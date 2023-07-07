import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './Home.scss';

const { Content, Footer } = Layout;
const { Title } = Typography;

const Home = () => {
  const handleClick = () => {
    window.open('https://scholar.google.com', '_blank');
  }

  return (
    <Layout className="homepage-background" style={{ minHeight: '80vh' }}>
      <Content >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <Title style={{color:'white'}}>Confvinent</Title>
          <p style={{color:'white'}}>Discover the wonders of science through articles.</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Add your content sections/components here, such as featured articles, latest experiments, etc. */}
          <Button type="primary" size="large" icon={<SearchOutlined />} onClick={handleClick} style={{ marginBottom: '16px' }}>
            Explore Articles
          </Button>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Confvinent ©2023</Footer>
    </Layout>
  );
};

export default Home;