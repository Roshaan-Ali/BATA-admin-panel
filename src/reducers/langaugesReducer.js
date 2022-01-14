// import { updateLanguage } from "../actions/actions";

const INITIALSTATE = { allLangauges: [] };

export const langaugesReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case 'ALL_LANGUAGES':
      return {
        ...state,
        allLangauges: action.payload,
      };

    default:
      return state;
  }
};
