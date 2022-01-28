// import { updateLanguage } from "../actions/actions";

const INITIALSTATE = { allPackages: [], customPackages: [] };

export function packagesReducer(state = INITIALSTATE, action) {
  switch (action.type) {
    case "ALL_PACKAGES":
      return {
        ...state,
        allPackages: action.payload,
      };

    case "CUSTOM_PACKAGES":
      return {
        ...state,
        customPackages: action.payload,
      };

    default:
      return state;
  }
}
