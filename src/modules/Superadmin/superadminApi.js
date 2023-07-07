import { get, post } from '../../requests';

export const getComittees = async () => {
  const resp = await get('/api/committee/committees');
  return resp.data;
};

export const getCommitteeInfo = async (id) => {
  const resp = await get(`/api/committee/committeeinfo/${id}`);
  return resp.data;
}

export const addCommittee = async (data) => {
  await post('/api/committee/addcommittee', data);
};

export const updateCommitteeName = async (id, data) => {
  await post(`/api/committee/update/${id}`, data);
};

export const addMember = async (id, data) => {
  await post(`/api/committee/addmember/${id}`, data);
};

export const grantAdmin = async (id, data) => {
  await post(`/api/committee/addadmin/${id}`, data);
};

export const flushAdmin = async (id, data) => {
  await post(`/api/committee/deleteadmin/${id}`, data);
};

export const activateMember = async (id, data) => {
  await post(`/api/committee/activate/${id}`, data);
};

export const deactivateMember = async (id, data) => {
  await post(`/api/committee/deactivate/${id}`, data);
};

export const deleteCommittee = async data => {
  await post('/api/committee/deletecommittee', data);
}
