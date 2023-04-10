import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import {
  updateCommitteeName,
  getCommitteeInfo,
  grantAdmin,
  flushAdmin,
  activateMember,
  deactivateMember,
  addMember,
} from './settingsApi';

const initialState = {
  committee: {
    name: '',
    id: '',
  },
  members: [],
  uiState: {
    editingCommittee: false,
    loadingCommitteeInfo: false,
    grantingOrFlushingAdmin: false,
    activatingOrDeactivatingMember: false,
  }
};

export const getCommitteeInfoThunk = createAsyncThunk(
  'getCommitteeInfoSettings',
  async () => {
    try {
      const resp = await getCommitteeInfo();
      return resp;
    } catch(err) {
      console.error(err);
      message.error(err.message);
    }
  }
);

export const updateCommitteeNameThunk = createAsyncThunk(
  'updateCommitteeNameSettings',
  async (payload, { getState }) => {
    const {
      settings: {
        committee: { id },
      }
    } = getState();
    try {
      await updateCommitteeName(id, payload);
      message.success('Committee name saved!');
    } catch(err) {
      console.error(err);
      message.error(err.message);
    }
  }
);

export const grantAdminThunk = createAsyncThunk(
  'grantAdminSettings',
  async (payload, { getState, dispatch }) => {
    try {
      const {
        settings: {
          committee: { id },
        },
      } = getState();
      await grantAdmin(id, payload);
      message.success('Admin granted!');
      dispatch(getCommitteeInfoThunk(id));
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

export const flushAdminThunk = createAsyncThunk(
  'flushAdminSettings',
  async (payload, { getState, dispatch }) => {
    try {
      const {
        settings: {
          committee: { id },
        },
      } = getState();
      await flushAdmin(id, payload);
      message.success('Admin flushed!');
      dispatch(getCommitteeInfoThunk(id));
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

export const activateMemberThunk = createAsyncThunk(
  'activateMemberSettings',
  async (payload, { getState, dispatch }) => {
    try {
      const {
        settings: {
          committee: { id },
        },
      } = getState();
      await activateMember(id, payload);
      message.success('Member activiated!');
      dispatch(getCommitteeInfoThunk(id));
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

export const deactivateMemberThunk = createAsyncThunk(
  'deactivateMemberSettings',
  async (payload, { getState, dispatch }) => {
    try {
      const {
        settings: {
          committee: { id },
        },
      } = getState();
      await deactivateMember(id, payload);
      message.success('Member activiated!');
      dispatch(getCommitteeInfoThunk(id));
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

export const addMemberThunk = createAsyncThunk(
  'addMemberSettings',
  async (payload, { getState, dispatch }) => {
    try {
      const {
        settings: {
          committee: { id },
        },
      } = getState();
      await addMember(id, payload);
      dispatch(getCommitteeInfoThunk(id));
      message.success('Member added!');
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getCommitteeInfoThunk.pending, state => {
        state.uiState.loadingCommitteeInfo = true;
      })
      .addCase(getCommitteeInfoThunk.fulfilled, (state, action) => {
        const { committee, members } = action.payload;
        state.committee = committee;
        state.members = members;
        state.uiState.loadingCommitteeInfo = false;
      })
      .addCase(getCommitteeInfoThunk.rejected, state => {
        state.uiState.loadingCommitteeInfo = false;
      })
      .addCase(updateCommitteeNameThunk.pending, state => {
        state.uiState.editingCommittee = true;
      })
      .addCase(updateCommitteeNameThunk.fulfilled, state => {
        state.uiState.editingCommittee = false;
      })
      .addCase(updateCommitteeNameThunk.rejected, state => {
        state.uiState.editingCommittee = false;
      })
      .addCase(grantAdminThunk.pending, state => {
        state.uiState.loadingCommitteeInfo = true;
      })
      .addCase(grantAdminThunk.rejected, state => {
        state.uiState.loadingCommitteeInfo = false;
      })
      .addCase(flushAdminThunk.pending, state => {
        state.uiState.loadingCommitteeInfo = true;
      })
      .addCase(flushAdminThunk.rejected, state => {
        state.uiState.loadingCommitteeInfo = false;
      })
      .addCase(activateMemberThunk.pending, state => {
        state.uiState.loadingCommitteeInfo = true;
      })
      .addCase(activateMemberThunk.rejected, state => {
        state.uiState.loadingCommitteeInfo = false;
      })
      .addCase(deactivateMemberThunk.pending, state => {
        state.uiState.loadingCommitteeInfo = true;
      })
      .addCase(deactivateMemberThunk.rejected, state => {
        state.uiState.loadingCommitteeInfo = false;
      })
      .addCase(addMemberThunk.pending, state => {
        state.uiState.loadingCommitteeInfo = true;
      })
      .addCase(addMemberThunk.rejected, state => {
        state.uiState.loadingCommitteeInfo = false;
      });
  }
});

export const setttingsSelector = state => {
  const {
    settings: {
      committee: { name },
      members,
      uiState,
    }
  } = state;

  return {
    name,
    members,
    ...uiState,
  };
};

export default settingsSlice.reducer;
