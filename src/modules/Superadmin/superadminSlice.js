import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import {
  getComittees,
  addCommittee,
  getCommitteeInfo,
  updateCommitteeName,
  addMember,
  grantAdmin,
  flushAdmin,
  activateMember,
  deactivateMember,
  deleteCommittee,
} from './superadminApi';

const initialState = {
  committes: [],
  editDrawer: {
    committee: {
      name: '',
      id: '',
    },
    members: [],
  },
  uiState: {
    tableLoading: false,
    addModalShow: false,
    addingCommittee: false,
    editDrawerShow: false,
    editingCommittee: false,
    loadingCommitteeInfo: false,
  }
};

export const getCommitteesThunk = createAsyncThunk(
  'getCommittees',
  async () => {
    try {
      const { committees } = await getComittees();
      return committees;
    } catch (err) {
      message.error(err.message);
      throw err;
    }
  }
);

export const addCommitteeThunk = createAsyncThunk(
  'addCommittee',
  async (payload, { dispatch }) => {
    try {
      await addCommittee(payload);
      dispatch(getCommitteesThunk());
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

export const getCommitteeInfoThunk = createAsyncThunk(
  'getCommitteeInfo',
  async (payload) => {
    try {
      const resp = await getCommitteeInfo(payload);
      return resp;
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

export const updateCommitteeNameThunk = createAsyncThunk(
  'updateCommitteeName',
  async (payload, { getState, dispatch }) => {
    try {
      const {
        superadmin: {
          editDrawer: {
            committee: { id },
          },
        },
      } = getState();
      await updateCommitteeName(id, payload);
      dispatch(getCommitteesThunk());
      message.success('Committee name saved!');
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

export const addMemberThunk = createAsyncThunk(
  'addMember',
  async (payload, { getState, dispatch }) => {
    try {
      const {
        superadmin: {
          editDrawer: {
            committee: { id },
          },
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

export const grantAdminThunk = createAsyncThunk(
  'grantAdmin',
  async (payload, { getState, dispatch }) => {
    try {
      const {
        superadmin: {
          editDrawer: {
            committee: { id },
          },
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
  'flushAdmin',
  async (payload, { getState, dispatch }) => {
    try {
      const {
        superadmin: {
          editDrawer: {
            committee: { id },
          },
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
  'activateMember',
  async (payload, { getState, dispatch }) => {
    try {
      const {
        superadmin: {
          editDrawer: {
            committee: { id },
          },
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
  'deactivateMember',
  async (payload, { getState, dispatch }) => {
    try {
      const {
        superadmin: {
          editDrawer: {
            committee: { id },
          },
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

export const deleteCommitteeThunk = createAsyncThunk(
  'deleteCommittee',
  async (payload, { dispatch }) => {
    try {
      await deleteCommittee(payload);
      message.success('Committee deleted!');
      dispatch(getCommitteesThunk());
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

const superadminSlice = createSlice({
  name: 'superadmin',
  initialState,
  reducers: {
    openAddModal: state => {
      state.uiState.addModalShow = true;
    },
    closeAddModal: state => {
      state.uiState.addModalShow = false;
    },
    openEditDrawer: state => {
      state.uiState.editDrawerShow = true;
    },
    closeEditDrawer: state => {
      state.uiState.editDrawerShow = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getCommitteesThunk.pending, state => {
        state.uiState.tableLoading = true;
      })
      .addCase(getCommitteesThunk.fulfilled, (state, action) => {
        state.uiState.tableLoading = false;
        state.committes = action.payload;
      })
      .addCase(getCommitteesThunk.rejected, state => {
        state.uiState.tableLoading = false;
      })
      .addCase(addCommitteeThunk.pending, state => {
        state.uiState.addingCommittee = true;
      })
      .addCase(addCommitteeThunk.fulfilled, state => {
        state.uiState.addingCommittee = false;
        state.uiState.addModalShow = false;
      })
      .addCase(addCommitteeThunk.rejected, state => {
        state.uiState.addingCommittee = false;
      })
      .addCase(getCommitteeInfoThunk.pending, state => {
        state.uiState.loadingCommitteeInfo = true;
      })
      .addCase(getCommitteeInfoThunk.fulfilled, (state, action) => {
        const { committee, members } = action.payload;
        state.uiState.editDrawerShow = true;
        state.uiState.loadingCommitteeInfo = false;
        state.editDrawer.committee = committee;
        state.editDrawer.members = members;
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
      .addCase(addMemberThunk.pending, state => {
        state.uiState.loadingCommitteeInfo = true;
      })
      .addCase(addMemberThunk.rejected, state => {
        state.uiState.loadingCommitteeInfo = false;
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
      .addCase(deleteCommitteeThunk.pending, state => {
        state.uiState.tableLoading = true;
      })
      .addCase(deleteCommitteeThunk.rejected, state => {
        state.uiState.tableLoading = false;
      });
  },
});

export const superadminSeletor = state => {
  const {
    superadmin: {
      committes,
      uiState: { tableLoading },
    },
  } = state;
  return {
    committes,
    tableLoading,
  };
};

export const addCommitteeModalSelector = state => {
  const {
    superadmin: {
      uiState: {
        addModalShow,
        addingCommittee,
      },
    },
  } = state;

  return {
    addModalShow,
    addingCommittee,
  };
};

export const editCommitteeDrawerSelector = state => {
  const {
    superadmin: {
      editDrawer: {
        committee: { name },
        members,
      },
      uiState: {
        editDrawerShow,
        editingCommittee,
        loadingCommitteeInfo,
        grantingOrFlushingAdmin,
        activatingOrDeactivatingMember,
      }
    }
  } = state;
  return {
    name,
    members,
    editDrawerShow,
    editingCommittee,
    loadingCommitteeInfo,
    grantingOrFlushingAdmin,
    activatingOrDeactivatingMember,
  };
};

export const { openAddModal, closeAddModal, openEditDrawer, closeEditDrawer } = superadminSlice.actions;

export default superadminSlice.reducer;
