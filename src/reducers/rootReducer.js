import { combineReducers } from "redux";
import settings from "./settings";
import { userReducer } from "./userReducer";
import { langaugesReducer } from "./langaugesReducer";
import { packagesReducer } from "./packagesReducer";
import { roleReducer } from "./roleReducer";
import { occasionsReducer } from "./occasionsReducer";

export default combineReducers({
  settings,
  userReducer,
  langaugesReducer,
  packagesReducer,
  roleReducer,
  occasionsReducer
});
