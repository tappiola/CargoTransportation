import { getAuthToken } from 'utils';
import { BACKEND_HOST } from 'constants/environment';

export const fetchAPI = async (uri, data, method = 'GET') => {
  const headers = {
    Authorization: `Bearer ${getAuthToken()}`,
    'Content-Type': 'application/json',
  };

  return fetch(BACKEND_HOST + uri, { headers, method, body: data })
    .then((response) => {
      if (response.ok) {
        const contentType = response.headers.get('Content-Type') || '';

        if (contentType.includes('application/json')) {
          return response.json().catch((error) => Promise.reject(new Error(`Invalid JSON: ${error.message}`)));
        }

        return Promise.reject(
          new Error(`Invalid content type: ${contentType}`),
        );
      }

      if (response.status === 404) {
        return Promise.reject(new Error(`Page not found: ${uri}`));
      }

      return response.json().then((res) => {
        const errors = [];
        Object.keys(res).forEach((key) => {
          errors.push(`${key}: ${res[key]}`);
        });

        return Promise.reject(new Error(errors));
      });
    })
    .catch((error) => Promise.reject(new Error(error.message)));
};
