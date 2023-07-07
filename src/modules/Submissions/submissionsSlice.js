import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from 'antd';
import { getSubmitList, getSubId, submitPaper, getSubmissions, getSubmisssion } from './submissionsApi';

const initialState = {
  submissions: [],
  subId: '',
  submitList: [],
  viewingId: '',
  viewingSubmission: {
    conName: '',
    title: '',
    status: '',
    authors: [],
  },
  uiState: {
    newSubmissionModalShow: false,
    loadingSubmitList: false,
    loadingSubmissions: false,
    submittingPaper: false,
    submissionViewDrawerShow: false,
  },
};

export const getSubmissionInitInfoThunk = createAsyncThunk(
  'getSubmissionInitInfo',
  async () => {
    try {
      const [{ submitList }, { subId }] = await Promise.all([getSubmitList(), getSubId()]);
      return {
        submitList,
        subId,
      };
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

export const getSubmissionsTunk = createAsyncThunk(
  'getSubmissions',
  async () => {
    try {
      const { submissions } = await getSubmissions();
      return submissions;
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

export const submitPaperThunk = createAsyncThunk(
  'submitPaper',
  async (payload, { getState, dispatch }) => {
    const {
      submissions: { subId }
    } = getState();
    try {
      await submitPaper(subId, payload);
      dispatch(getSubmissionsTunk());
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
);

export const getSubmisssionThunk = createAsyncThunk(
  'getSubmisssion',
  async (payload, { dispatch }) => {
    try {
      dispatch(openSubmissionDrawerModal(payload));
      const res = getSubmisssion(payload);
      return res;
    } catch(err) {
      message.error(err.message);
      throw err;
    }
  }
)

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    openNewSubmissionModal: state => {
      state.uiState.newSubmissionModalShow = true;
    },
    closeNewSubmissionModal: state => {
      state.uiState.newSubmissionModalShow = false;
    },
    openSubmissionDrawerModal: (state, action) => {
      state.viewingId = action.payload;
      state.uiState.submissionViewDrawerShow = true;
    },
    closeSubmissionDrawerModal: state => {
      state.uiState.submissionViewDrawerShow = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getSubmissionInitInfoThunk.pending, state => {
        state.uiState.loadingSubmitList = true;
      })
      .addCase(getSubmissionInitInfoThunk.fulfilled, (state, action) => {
        const { submitList, subId } = action.payload;
        state.submitList = submitList;
        state.subId = subId;
        state.uiState.loadingSubmitList = false;
      })
      .addCase(getSubmissionInitInfoThunk.rejected, state => {
        state.uiState.loadingSubmitList = false;
      })
      .addCase(getSubmissionsTunk.pending, state => {
        state.uiState.loadingSubmissions = true;
      })
      .addCase(getSubmissionsTunk.fulfilled, (state, action) => {
        state.uiState.loadingSubmissions = false;
        state.submissions = action.payload;
      })
      .addCase(getSubmissionsTunk.rejected, state => {
        state.uiState.loadingSubmissions = false;
      })
      .addCase(submitPaperThunk.pending, state => {
        state.uiState.submittingPaper = true;
      })
      .addCase(submitPaperThunk.fulfilled, state => {
        state.uiState.submittingPaper = false;
        state.uiState.newSubmissionModalShow = false;
      })
      .addCase(submitPaperThunk.rejected, state => {
        state.uiState.submittingPaper = false;
      })
      .addCase(getSubmisssionThunk.fulfilled, (state, action) => {
        state.viewingSubmission = action.payload;
      });
  }
});

export const newSubmissionModalSelector = state => {
  const {
    submissions: { subId, submitList, uiState },
  } = state;
  const uploadUrl = `http://${process.env.REACT_APP_API_DOMAIN}/api/submission/upload/${subId}`;

  return {
    uploadUrl,
    submitList,
    ...uiState,
  }
};

export const submissionsSelector = state => {
  const {
    submissions: { submissions },
  } = state;
  return {
    submissions
  };
};

export const submissionViewDrawerSelector = state => {
  const {
    submissions: {
      viewingSubmission,
      viewingId,
      uiState: { submissionViewDrawerShow },
    },
  } = state;

  const submissionUrl = viewingId ? `http://${process.env.REACT_APP_API_DOMAIN}/api/submission/getpaper/${viewingId}` : '';

  return {
    viewingSubmission,
    submissionUrl,
    submissionViewDrawerShow
  }
}

export const {
  openNewSubmissionModal,
  closeNewSubmissionModal,
  closeSubmissionDrawerModal,
  openSubmissionDrawerModal,
} = submissionsSlice.actions;
export default submissionsSlice.reducer;
