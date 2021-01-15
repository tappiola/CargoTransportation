export const usersSelector = (users) => users.map((u) => {
  const { company, ...user } = u;
  return { ...user, ...company };
});
