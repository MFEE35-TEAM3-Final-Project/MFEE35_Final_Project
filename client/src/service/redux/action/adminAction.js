export const adminLogin = (adminData) => {
  return {
    type: "ADMIN_LOGIN",
    payload: adminData
  };
};

export const adminLogout = () => {
  return {
    type: "ADMIN_LOGOUT"
  };
};
