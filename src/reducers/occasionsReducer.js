
const INITIALSTATE = { allOccasions: [] };

export const occasionsReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case 'ALL_OCCASIONS':
      return {
        ...state,
        allOccasions: action.payload,
      };

    default:
      return state;
  }
};
