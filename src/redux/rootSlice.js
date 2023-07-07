import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from 'antd';
import { getPrivilege, logout } from './rootApi';

const initialState = {
  privilege: null,
  user: '',
};

export const getPrivilegeThunk = createAsyncThunk(
  'getPrivilege',
  async () => {
    try {
      const { userGroup, name } = await getPrivilege();
      return {
        userGroup,
        name
      }
    } catch(err) {
      console.error(err);
      message.error(err.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'logout',
  async () => {
    try {
      await logout();
    } catch(err) {
      console.error(err);
      message.error(err.message);
    }
  }
);

const root = createSlice({
  name: 'root',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getPrivilegeThunk.fulfilled, (state, action) => {
        const { userGroup, name } = action.payload;
        state.privilege = userGroup;
        state.user = name;
      });
  }
});

export const privilegeSelector = state => {
  const {
    root: { privilege },
  } = state;

  return {
    privilege
  };
};

export const userSelector = state => {
  const {
    root: { user },
  } = state;

  return {
    user
  };
};

export default root.reducer;
