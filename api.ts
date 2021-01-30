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

  const baseUrl = __DEV__
    ? 'http://smart-app.eba-qfgvtjph.ap-northeast-2.elasticbeanstalk.com/api/v1'
    : 'http://smart-app.eba-qfgvtjph.ap-northeast-2.elasticbeanstalk.com/api/v1';
  const fullUrl = `${baseUrl}${path}`;
  console.log(data);
  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, {headers, params});
  } else {
    return axios[method](fullUrl, data, {headers, params});
  }
};

export const loginUser = (form) => callApi('post', '/users/login/', form);
export const getPosts = (type, page) =>
  callApi('get', '/posts/search/', null, null, {type, page});
export const createPost = (form, jwt) => callApi('post', '/posts/', form, jwt);
export const deletePost = (id, jwt) =>
  callApi('delete', `/posts/${id}/`, null, jwt);
export const editPost = (id, form, jwt) =>
  callApi('put', `/posts/${id}/`, form, jwt);
export const getComments = (postId) =>
  callApi('get', '/comments/search/', null, null, {post_id: postId});
export const createComment = (form, jwt) =>
  callApi('post', '/comments/', form, jwt, null);
export const delteComment = (commentId, jwt) =>
  callApi('delete', `/comments/${commentId}/`, null, jwt, null);
export const editComment = (id, form, jwt) =>
  callApi('put', `/comments/${id}/`, form, jwt, null);
export const getFavPosts = (userId, jwt) =>
  callApi('get', `/users/${userId}/favs/`, null, jwt, null);
export const toggleFavPost = (userId, postId, jwt) =>
  callApi('put', `/users/${userId}/favs/`, {pk: postId}, jwt, null);
