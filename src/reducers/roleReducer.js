const INITIALSTATE = { allRoles: [] };

export const roleReducer = (state = INITIALSTATE, action) => {
  console.log("::::::::::::::::::::", state.allRoles);
  switch (action.type) {
    case 'ALL_ROLES':
      return {
        ...state,
        allRoles: action.payload,
      };

    default:
      return state;
  }
};
