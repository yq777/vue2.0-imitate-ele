import axios from 'axios';

const instance = axios.create();

instance.defaults.timeout = 10 * 1000;

instance.defaults.baseURL = '';

instance.interceptors.request.use(
  request => {
    request.headers = {
      'Content-Type': 'application/json'
    };
    return request;
  }
);

instance.interceptors.response.use(
  response => {
    let res = response.data;
    return new Promise((resolve, reject) => {
      resolve(res);
    });
  },
  errors => {
    return Promise.reject(errors);
  }
);

export function ajaxPost(url, params) {
  return instance.request({
    method: 'POST',
    url: url,
    data: params
  })
}

export function ajaxGet(url, params) {
  return instance.request({
    method: 'GET',
    url: url,
    params: params
  })
}

export default instance;
