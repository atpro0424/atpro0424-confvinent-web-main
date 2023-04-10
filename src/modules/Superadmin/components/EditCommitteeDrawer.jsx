import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Form, Drawer, Input, Button, Space, Table } from 'antd';
import {
  editCommitteeDrawerSelector,
  closeEditDrawer,
  updateCommitteeNameThunk,
  addMemberThunk,
  flushAdminThunk,
  grantAdminThunk,
  activateMemberThunk,
  deactivateMemberThunk,
} from '../superadminSlice';
import './EditCommitteeDrawer.scss';

const EditCommitteeDrawer = () => {
  const { name, members, editDrawerShow, editingCommittee } = useSelector(editCommitteeDrawerSelector);
  const dispatch = useDispatch();
  const committeeInfoForm = React.useRef();
  const memberForm = React.useRef();
  
  const onCancel = () => {
    dispatch(closeEditDrawer());
  };

  const onCommitteeNameSave = () => {
    committeeInfoForm.current.submit();
  };

  const onCommitteeNameFinish = values => {
    dispatch(updateCommitteeNameThunk(values));
  };

  const onAddMemberClicked = () => {
    memberForm.current.submit();
  };

  const onAddMemberFinish = values => {
    dispatch(addMemberThunk(values));
  };

  const grantOrFlushAdmin = (entry) => {
    if (entry.isAdmin) {
      dispatch(flushAdminThunk({ userId: entry.id }));
    } else {
      dispatch(grantAdminThunk({ userId: entry.id }));
    }
  };

  const activateOrDeactivate = (entry) => {
    if (entry.status === 'ACTIVE') {
      dispatch(deactivateMemberThunk({ userId: entry.id }));
    } else {
      dispatch(activateMemberThunk({ userId: entry.id }));
    }
  };

  useEffect(() => {
    if (committeeInfoForm.current) {
      committeeInfoForm.current.setFieldValue('name', name);
    }
  }, [name]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Title',
      key: 'title',
      render: (_, entry) => {
        return entry.isAdmin ? 'Admin' : 'Member';
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      key: 'actions',
      render: (_, entry) => (
        <Space>
          <Button onClick={() => { grantOrFlushAdmin(entry) }}>
            {entry.isAdmin ? 'Flush Admin' : 'Grant Admin'}
          </Button>
          <Button onClick={() => { activateOrDeactivate(entry) }}>
            {entry.status === 'ACTIVE' ? 'Deactiviate' : 'Activiate'}
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Drawer
      bodyStyle={{ paddingTop: '16px' }}
      open={editDrawerShow}
      onClose={onCancel}
      width={900}
    >
      <div>
        <div className="drawer_title">Committee Infomation</div>
        <div className="drawer_content">
          <Space.Compact style={{ width: '100%' }}>
            <Form ref={committeeInfoForm} onFinish={onCommitteeNameFinish} style={{ width: '50%' }}>
              <Form.Item label="Committee Name" name="name" rules={[{ required: true }]}>
                <Input disabled={editingCommittee} />
              </Form.Item>
            </Form>
            <Button type="primary" loading={editingCommittee} onClick={onCommitteeNameSave}>Save</Button>
          </Space.Compact>
        </div>
        <div className="drawer_title">Committee Members</div>
        <div className="drawer_content">
          <Space.Compact style={{ width: '100%' }}>
            <Form ref={memberForm} style={{ width: '50%' }} onFinish={onAddMemberFinish}>
              <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Form>
            <Button type="primary" onClick={onAddMemberClicked}>Add</Button>
          </Space.Compact>
          <Table rowKey="id" columns={columns} dataSource={members} />
        </div>
      </div>
    </Drawer>
  );
};

export default EditCommitteeDrawer;
