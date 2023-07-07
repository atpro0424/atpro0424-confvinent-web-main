import { get, post } from '../../requests';

export const getCurrentConference = async () => {
  const resp = await get('/api/conferencce/currentconference');
  return resp.data;
};

export const createConference = async data => {
  await post('/api/conferencce/create', data);
};

export const deleteConference = async data => {
  await post('/api/conferencce/delete', data);
};