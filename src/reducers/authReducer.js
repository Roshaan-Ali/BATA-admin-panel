const INITIAL_STATE = {
  isLogin: false,
  userData: null,
  accessToken: "",
  totalInterpreters: 0,
  totalUsers: 0,
  totalBookings: null,
  chartData: [],
};

export function authReducer(state = INITIAL_STATE, action) {
  // console.log(action);
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

    case "DASHBOARD_COUNTS":
      return {
        ...state,
        totalInterpreters: action?.payload?.interpreters,
        totalUsers: action?.payload?.users,
        totalBookings: action.payload?.bookings,
      };

    case "DASHBOARD_CHART_DATA":
      return {
        ...state,
        chartData: action?.payload,
      };

    default:
      return state;
  }
}
