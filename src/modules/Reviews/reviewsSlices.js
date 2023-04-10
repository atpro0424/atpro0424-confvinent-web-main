import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from 'antd';
import { getReviews, submitReview } from './reviewsApi';
import { getTime } from '../../utils';

const initialState = {
  reviews: [],
  reviewingId: '',
  uiState: {
    reviewTableLoading: false,
    reviewerDrawerShow: false,
    submitting: false,
  },
};

export const getReviewsThunk = createAsyncThunk(
  'getReviews',
  async () => {
    try {
      const { reviews } = await getReviews();
      return reviews;
    } catch(err) {
      message.error(err);
      throw err;
    }
  }
);

export const submitReviewThunk = createAsyncThunk(
  'submitReview',
  async (payload, { getState, dispatch }) => {
    try {
      const {
        reviews: { reviewingId },
      } = getState();
      await submitReview(reviewingId, payload);
      dispatch(getReviewsThunk());
    } catch(err) {
      message.error(err);
      throw err;
    }
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    openReivewDrawer: (state, action) => {
      state.reviewingId = action.payload;
      state.uiState.reviewerDrawerShow = true;
    },
    closeReviewerDrawer: state => {
      state.uiState.reviewerDrawerShow = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getReviewsThunk.pending, state => {
        state.uiState.reviewTableLoading = true;
      })
      .addCase(getReviewsThunk.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.uiState.reviewTableLoading = false;
      })
      .addCase(getReviewsThunk.rejected, state => {
        state.uiState.reviewTableLoading = false;
      })
      .addCase(submitReviewThunk.pending, state => {
        state.uiState.submitting = true;
      })
      .addCase(submitReviewThunk.fulfilled, state => {
        state.uiState.submitting = false;
        state.uiState.reviewerDrawerShow = false;
      })
      .addCase(submitReviewThunk.rejected, state => {
        state.uiState.submitting = false;
      });
  }
});

export const reviewDrawerSelector = state => {
  const {
    reviews: {
      reviews,
      reviewingId,
      uiState: {
        reviewerDrawerShow,
        submitting,
      }
    }
  } = state;

  const paperUrl = reviewingId ? `http://${process.env.REACT_APP_API_DOMAIN}/api/submission/getpaper/${reviewingId}` : '';
  let submission = reviews.find(el => el.subId === reviewingId);

  if (!submission) {
    submission = {
      title: '',
      conName: '',
      reviewDeadline: 0,
      status: 'PENDING',
      decision: null,
    }
  }

  const { title, conName, reviewDeadline, status, decision } = submission;

  return {
    reviewerDrawerShow,
    paperUrl,
    submitting,
    submission: {
      title,
      conName,
      reviewDeadline: getTime(reviewDeadline),
      status,
      decision: decision === null ? 'N/A' : decision,
      canReview: status === 'PENDING' && decision === null
    },
  };
}

export const reviewsSelector = state => {
  const {
    reviews: {
      reviews,
      uiState: { reviewTableLoading },
    },
  } = state;

  const processed = reviews.map(review => {
    const { subId, title, conName, reviewDeadline, status, decision } = review;
    return {
      subId,
      title,
      conName,
      reviewDeadline: getTime(reviewDeadline),
      status,
      decision: decision === null ? 'N/A' : decision,
      canReview: status === 'PENDING' && decision === null,
    }
  });

  return {
    reviews: processed,
    reviewTableLoading,
  };
};

export const { openReivewDrawer, closeReviewerDrawer } = reviewsSlice.actions;

export default reviewsSlice.reducer;
