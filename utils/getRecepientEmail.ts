export const getRecepientEmail = (users: any, userLoggedIn: any) => {
  return users?.filter(
    (userToFilter: any) => userToFilter !== userLoggedIn?.email
  )[0];
};
