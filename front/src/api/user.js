const HOST = 'http://localhost:5000';

export const usersGetApi = async () => fetch(`${HOST}/users`);
