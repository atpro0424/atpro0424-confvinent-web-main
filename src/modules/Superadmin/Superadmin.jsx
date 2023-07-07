import React, { useEffect } from "react";
import { Table, Space, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  superadminSeletor,
  getCommitteesThunk,
  openAddModal,
  getCommitteeInfoThunk,
  deleteCommitteeThunk,
} from './superadminSlice';
import AddCommitteeModal from "./components/AddCommitteeModal";
import EditCommitteeDrawer from "./components/EditCommitteeDrawer";
import './Superadmin.scss';

const Superadmin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommitteesThunk());
  }, [dispatch]);


  const onAddCommiteeClicked = () => {
    dispatch(openAddModal());
  };

  const onEditCommiteeClicked = id => {
    dispatch(getCommitteeInfoThunk(id));
  };

  const onDeleteCommitteeClicked = id => {
    dispatch(deleteCommitteeThunk({ comitId: id }));
  }

  const { committes, tableLoading } = useSelector(superadminSeletor);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '',
      width: 15,
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => {
            onEditCommiteeClicked(record.id);
          }}>Edit</Button>
          <Button onClick={() => {
            onDeleteCommitteeClicked(record.id);
          }}>Delete</Button>
        </Space>
      )
    },
  ];

  return (
    <>
      <AddCommitteeModal />
      <EditCommitteeDrawer />
      <Space size={20} className="super-admin" direction="vertical">
        <div className="super-admin_btn-container">
          <Button type="primary" onClick={onAddCommiteeClicked}>Add Committee</Button>
        </div>
        <Table rowKey="id" columns={columns} dataSource={committes} loading={tableLoading} />
      </Space>
    </>
  )
};

export default Superadmin;