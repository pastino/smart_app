import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

const callApi = async (
  method: string,
  path: string,
  data: any,
  jwt?: string | null,
  params?: any,
) => {
  let headers: any = {
    'Content-Type': 'application/json',
  };

  if (jwt) {
    headers = {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    };
  }

  const baseUrl = 'http://12881c3b0093.ngrok.io/api/v1';
  const fullUrl = `${baseUrl}${path}`;
  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, {headers, params});
  } else {
    return axios[method](fullUrl, data, {headers, params});
  }
};

export const loginUser = (form, jwt) => callApi('post', '/users/login/', form);
export const getPosts = (type, page) =>
  callApi('get', '/posts/search/', null, null, {type, page});
export const createPost = (form, jwt) => callApi('post', '/posts/', form, jwt);
export const deletePost = (id, jwt) =>
  callApi('delete', `/posts/${id}/`, null, jwt);
export const editPost = (id, form, jwt) =>
  callApi('put', `/posts/${id}/`, form, jwt);
