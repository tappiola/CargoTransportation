export const signIn = async (email, password) => {
  const url = 'http://localhost:9000/users/login';
  const data = { user: { email, password } };
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params);
};
