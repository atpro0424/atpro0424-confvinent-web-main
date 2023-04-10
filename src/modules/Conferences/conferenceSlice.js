import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from 'antd';
import { getTime, getTimestamp } from '../../utils';
import { getCurrentConference, createConference, deleteConference } from './conferenceApi';

const initialState = {
  curConference: undefined,
  uiState: {
    loadingCurrentConf: true,
    submitting: false,
  },
};

export const getCurrentConferenceThunk = createAsyncThunk(
  'getCurrentConference',
  async () => {
    try {
      const resp = await getCurrentConference();
      return resp;
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

export const createConferenceThunk = createAsyncThunk(
  'createConference',
  async (data, { dispatch }) => {
    try {
      const { name, submitDeadline, reviewDeadline, endTime, reviewNumberForEachPaper } = data;
      await createConference({
        name,
        submitDeadline: getTimestamp(submitDeadline),
        reviewDeadline: getTimestamp(reviewDeadline),
        endTime:getTimestamp(endTime),
        reviewNumberForEachPaper,
      });
      message.success('Conference created!');
      dispatch(getCurrentConferenceThunk());
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

export const deleteConferenceThunk = createAsyncThunk(
  'deleteConference',
  async (_, { getState, dispatch }) => {
    const {
      conference: {
        curConference: { conId },
      },
    } = getState();
    try {
      await deleteConference({ conId });
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

const conferenceSlice = createSlice({
  name: 'conference',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getCurrentConferenceThunk.pending, state => {
        state.uiState.loadingCurrentConf = true;
      })
      .addCase(getCurrentConferenceThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.curConference = action.payload;
        }
        state.uiState.loadingCurrentConf = false;
      })
      .addCase(getCurrentConferenceThunk.rejected, state => {
        state.uiState.loadingCurrentConf = false;
      })
      .addCase(deleteConferenceThunk.pending, state => {
        state.uiState.loadingCurrentConf = true;
      })
      .addCase(deleteConferenceThunk.fulfilled, state => {
        state.uiState.loadingCurrentConf = false;
        state.curConference = undefined;
      })
      .addCase(deleteConferenceThunk.rejected, state => {
        state.uiState.loadingCurrentConf = false;
      }); 
  }
});

export const conferenceSelector = state => {
  const {
    conference: {
      curConference,
      uiState: {
        loadingCurrentConf,
        submitting,
      }
    }
  } = state;

  let conf = curConference;

  if (curConference) {
    const { name, submitDeadline, reviewDeadline, endTime, createTime, reviewNumberForEachPaper  } = curConference;
    conf = {
      name,
      submitDeadline: getTime(submitDeadline),
      reviewDeadline: getTime(reviewDeadline),
      endTime: getTime(endTime),
      createTime: getTime(createTime),
      reviewNumberForEachPaper,
    };
  }
  
  return {
    curConference: conf,
    loadingCurrentConf,
    submitting,
  };
};

export default conferenceSlice.reducer;
