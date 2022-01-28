const INITIALSTATE = { allRoles: [], inactiveInterpreters: [] };

export function roleReducer(state = INITIALSTATE, action) {
  switch (action.type) {
    case "ALL_ROLES":
      return {
        ...state,
        allRoles: action.payload,
      };
    case "GET_INACTIVE_INTERPRETERS":
      return {
        ...state,
        inactiveInterpreters: action.payload,
      };
    default:
      return state;
  }
}
