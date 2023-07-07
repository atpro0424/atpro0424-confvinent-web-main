import { get, post } from '../../requests';

export const getSubmitList = async () => {
  const resp = await get('/api/conferencce/submitlist');
  return resp.data
};

export const getSubId = async () => {
  const resp = await get('/api/submission/subid');
  return resp.data
};

export const submitPaper = async (id, data) => {
  await post(`/api/submission/submit/${id}`, data);
};

export const getSubmissions = async () => {
  const resp = await get('/api/submission/submissionlist');
  return resp.data;
};

export const getSubmisssion = async (id) => {
  const resp = await get(`/api/submission/get/${id}`);
  return resp.data;
};
