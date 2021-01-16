import axios from 'axios';

const callApi = async (
  method: string,
  path: string,
  data: any,
  jwt?: string,
) => {
  const headers = {
    Authorization: jwt,
    'Content-Type': 'application/json',
  };
  const baseUrl = 'http://8b7b5dfeb676.ngrok.io/api/v1';
  const fullUrl = `${baseUrl}${path}`;
  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, {headers});
  } else {
    return axios[method](fullUrl, data, {headers});
  }
};

export const createAccount = (form) => callApi('post', '/users', form);
export const loginUser = (form) => {
  return callApi('post', '/users/login/', form);
};
