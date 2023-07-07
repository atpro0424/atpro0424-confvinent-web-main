import ky from "ky";

const send = async (endpoint, options) => {
  const url = `http://${process.env.REACT_APP_API_DOMAIN}${endpoint}`;
  try {
    const resp = await ky(url, {
      credentials: 'include',
      ...options
    });
    if (resp.redirected) {
      window.location.href = resp.url;
    }
    return resp;
  } catch(err) {
    const body = await err.response.json();

    if (body) {
      throw new Error(body.message);
    } else {
      throw new Error('Unknown error');
    }
  }
};

export const get = async (endpoint) => {
  try {
    const resp = await send(endpoint, { method: 'get' });
    const respBody = await resp.json();
    return respBody;
  } catch(err) {
    throw err;
  }
};

export const head = async (endpoint) => {
  try {
    const resp = await send(endpoint, { method: 'head' });
    const respBody = await resp.json();
    return respBody;
  } catch(err) {
    throw err;
  }
};

export const post = async (endpoint, body) => {
  try {
    const resp = await send(endpoint, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      }
    });
    const respBody = await resp.json();
    return respBody;
  } catch(err) {
    throw err;
  }
};