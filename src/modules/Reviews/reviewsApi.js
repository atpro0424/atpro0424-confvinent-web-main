import { get, post } from '../../requests';

export const getReviews = async () => {
  const resp = await get('/api/review/reviewlist');
  return resp.data;
};

export const submitReview = async (id, payload) => {
  await post(`/api/review/submit/${id}`, payload);
}
