import { combineReducers } from "redux";
import settings from "./settings";
import { userReducer } from "./userReducer";
import { langaugesReducer } from "./langaugesReducer";
import { packagesReducer } from "./packagesReducer";
import { roleReducer } from "./roleReducer";
import { occasionsReducer } from "./occasionsReducer";
import { bookingsReducer } from "./bookingsReducer";
import { authReducer } from "./authReducer";

export default combineReducers({
  settings,
  userReducer,
  langaugesReducer,
  packagesReducer,
  roleReducer,
  authReducer,
  bookingsReducer,
  occasionsReducer,
});
