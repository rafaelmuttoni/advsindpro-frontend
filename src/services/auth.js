import api from 'src/services/api';

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/sessions`, { email, password })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const register = (username, email, password) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/auth/local/register`, { username, email, password })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/sessions/verify`, {
        refresh_token: token
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
