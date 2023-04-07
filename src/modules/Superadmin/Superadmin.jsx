import React, { useEffect } from "react";
import { Table, Space, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { superadminSeletor, getCommitteesThunk } from './superadminSlice';
import './Superadmin.scss';

const Superadmin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommitteesThunk());
  }, [dispatch]);

  const { committes } = useSelector(superadminSeletor);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <Space size={20} className="super-admin" direction="vertical">
      <div className="super-admin_btn-container">
        <Button type="primary">Add Committee</Button>
      </div>
      <Table columns={columns} dataSource={committes} />
    </Space>
  )
};

export default Superadmin;