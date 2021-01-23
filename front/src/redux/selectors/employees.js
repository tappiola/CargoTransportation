export const usersWithRoleSelector = (employeesData, role) => employeesData
  .filter((u) => u.roles.reduce((prev, next) => [...prev, next.role], []).includes(role));
