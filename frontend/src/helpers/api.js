import { config } from '../constants/config';

function send({ method, path, data, token }) {
  const fetch = process.browser ? window.fetch : require('node-fetch').default;

  const opts = { method, headers: {} };

  if (data) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(data);
  }

  if (token) {
    opts.headers['token'] = token;
  }

  return fetch(`${config.API_URL}/${path}`, opts)
    .then(r => r.text())
    .then(json => {
      try {
        return JSON.parse(json);
      } catch (err) {
        return json;
      }
    });
}

function get(path, token) {
  return send({ method: 'GET', path, token });
}

function del(path, token) {
  return send({ method: 'DELETE', path, token });
}

function post(path, data, token) {
  return send({ method: 'POST', path, data, token });
}

function patch(path, data, token) {
  return send({ method: 'PATCH', path, data, token });
}

function put(path, data, token) {
  return send({ method: 'PUT', path, data, token });
}

export const api = {
  get,
  del,
  post,
  patch,
  put,
};
