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

        if (response.redirected) {
          return Promise.resolve({ redirected: true });
        }

        if (contentType.includes('application/json')) {
          return response.json().catch((error) => Promise.reject(new Error(`Invalid JSON: ${error.message}`)));
        }

        if (response.status === 204) {
          return Promise.resolve();
        }

        return Promise.reject(
          new Error(`Invalid content type: ${contentType}`),
        );
      }

      if (response.status === 404) {
        return Promise.reject(new Error(`Page not found: ${uri}`));
      }

      return response.json().then((res) => {
        const errors = Object.keys(res).map((key) => res[key]);
        return Promise.reject(new Error(errors.join(', ')));
      });
    })
    .catch((error) => Promise.reject(error));
};
