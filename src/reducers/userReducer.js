const INITIALSTATE = { allUsers: [] };

export const userReducer = (state = INITIALSTATE, action) => {
  console.log("::::::::::::::::::::", state.allUsers);
  switch (action.type) {
    case 'ALL_USERS':
      return {
        ...state,
        allUsers: action.payload,
      };

    default:
      return state;
  }
};
