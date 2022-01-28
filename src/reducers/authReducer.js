const INITIAL_STATE = {
  isLogin: false,
  userData: null,
  accessToken: "",
};

export function authReducer(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLogin: true,
        userData: action?.payload,
        accessToken: action?.payload?.token,
      };

    case "LOGOUT_REQUEST":
      return {
        isLogin: false,
        userData: null,
        accessToken: "",
      };

    default:
      return state;
  }
}
