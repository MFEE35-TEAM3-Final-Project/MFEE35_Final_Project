const initialState = {
  isLoggedIn: false,
  userData: null
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload
      };
    case "USER_LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default userReducers;
