import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getComittees } from './superadminApi';

const initialState = {
  committes: [],
  uiState: {
    tableLoading: false,
  }
};

export const getCommitteesThunk = createAsyncThunk(
  'getCommittees',
  async () => {
    try {
      const { committees } = await getComittees();
      return committees;
    } catch (err) {
      console.error(err);
      message.error(err);
    }
  }
);

const superadminSlice = createSlice({
  name: 'superadmin',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getCommitteesThunk.pending, state => {
        state.uiState.tableLoading = true;
      })
      .addCase(getCommitteesThunk.fulfilled, state => {
        state.uiState.tableLoading = false;
      })
      .addCase(getCommitteesThunk.rejected, state => {
        state.uiState.tableLoading = false;
      });
  },
});

export const superadminSeletor = state => {
  const { committes } = state;
  return {
    committes
  };
}

export default superadminSlice.reducer;
