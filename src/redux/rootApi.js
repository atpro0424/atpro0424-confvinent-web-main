import { get, head } from '../requests';

export const getPrivilege = async () => {
  const resp = await get('/api/privilege/usergroup');
  return resp.data;
};

export const logout = async () => {
  await head('/api/auth/logout');
};
