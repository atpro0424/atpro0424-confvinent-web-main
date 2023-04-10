import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Space, Table } from 'antd';
import {
  setttingsSelector,
  updateCommitteeNameThunk,
  getCommitteeInfoThunk,
  flushAdminThunk,
  grantAdminThunk,
  deactivateMemberThunk,
  activateMemberThunk,
  addMemberThunk,
} from './settingsSlice';
import './Settings.scss';

const Settings = () => {
  const { editingCommittee, name, members } = useSelector(setttingsSelector);
  const committeeInfoForm = React.useRef();
  const memberForm = React.useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommitteeInfoThunk());
  }, [dispatch]);

  useEffect(() => {
    if (committeeInfoForm.current) {
      committeeInfoForm.current.setFieldValue('name', name);
    }
  }, [name]);

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
  }

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
      width: 20,
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
    <div className='settings'>
      <div className='settings_title'>Committee Infomation</div>
      <div className='settings_content'>
        <Space.Compact style={{ width: '100%' }}>
          <Form className='settings_form' ref={committeeInfoForm} onFinish={onCommitteeNameFinish}>
            <Form.Item label="Committee Name" name="name" rules={[{ required: true }]}>
              <Input disabled={editingCommittee} />
            </Form.Item>
          </Form>
          <Button type="primary" loading={editingCommittee} onClick={onCommitteeNameSave}>Save</Button>
        </Space.Compact>
      </div>
      <div className='settings_title'>Committee Members</div>
      <div className='settings_content'>
        <Space.Compact style={{ width: '100%' }}>
          <Form className='settings_form' ref={memberForm} onFinish={onAddMemberFinish}>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
          <Button type="primary" onClick={onAddMemberClicked}>Add</Button>
        </Space.Compact>
        <Table rowKey="id" dataSource={members} columns={columns}  />
      </div>
    </div>
  );
};

export default Settings;