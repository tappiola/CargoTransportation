import { getAuthToken } from 'utils';

export const fetchAPI = async (url, data, method = 'POST') => {
  const headers = {
    Authorization: `Token ${getAuthToken()}`,
  };

  return fetch(url, { headers, method, body: data })
    .then((response) => {
      if (response.ok) {
        const contentType = response.headers.get('Content-Type') || '';

        if (contentType.includes('application/json')) {
          return response.json().catch((error) => Promise.reject(new Error(`Invalid JSON: ${error.message}`)));
        }

        if (contentType.includes('text/html')) {
          return response
            .text()
            .then((html) => ({
              page_type: 'generic',
              html,
            }))
            .catch((error) => Promise.reject(new Error(`HTML error: ${error.message}`)));
        }

        return Promise.reject(
          new Error(`Invalid content type: ${contentType}`),
        );
      }

      if (response.status === 404) {
        return Promise.reject(new Error(`Page not found: ${url}`));
      }

      return response.json().then((res) => {
        // if the response is ok but the server rejected the request,
        // e.g. because of a wrong password, we want to display the reason
        // the information is contained in the json()
        // there may be more than one error
        const errors = [];
        Object.keys(res).forEach((key) => {
          errors.push(`${key}: ${res[key]}`);
        });
        return Promise.reject(new Error(errors));
      });
    })
    .catch((error) => Promise.reject(new Error(error.message)));
};
