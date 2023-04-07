import { get } from '../../requests';

export const getComittees = async () => {
  const resp = await get('/api/committee/committees');
  return resp.data;
};
