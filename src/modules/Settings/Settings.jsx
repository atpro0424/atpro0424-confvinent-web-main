import React from 'react';
import { Button } from 'antd';

const Settings = () => {
  const handleLogout = () =>{
    // Return to login page.

  }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button
        key="logout"
        type='primary'
        onClick={handleLogout} style={{ marginBottom: '16px' }}>
        Logout
      </Button>
    </div>
  );
};

export default Settings;