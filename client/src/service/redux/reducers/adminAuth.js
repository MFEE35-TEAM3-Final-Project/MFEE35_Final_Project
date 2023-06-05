const initialState = {
  isLoggedIn: false,
  adminData: null
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        adminData: action.payload
      };
    case "ADMIN_LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default adminReducer;
