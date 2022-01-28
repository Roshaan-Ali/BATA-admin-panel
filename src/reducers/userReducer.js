const INITIALSTATE = { allUsers: [] };

export function userReducer(state = INITIALSTATE, action) {
  switch (action.type) {
    case "ALL_USERS":
      return {
        ...state,
        allUsers: action.payload,
      };

    default:
      return state;
  }
}
