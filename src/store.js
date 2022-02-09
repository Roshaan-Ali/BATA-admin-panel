import thunk from "redux-thunk";
// import rootReducer from "./reducers/rootReducer";
// export default function configureStore() {
//     const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     return createStore(
//         rootReducer,
//         composeEnhancers(applyMiddleware(thunk))
//     );
// }

import { createStore, combineReducers, applyMiddleware } from "redux";

import { authReducer } from "./reducers/authReducer";
import { settings } from "./reducers/settings";
import { bookingsReducer } from "./reducers/bookingsReducer";
import { langaugesReducer } from "./reducers/langaugesReducer";
import { userReducer } from "./reducers/userReducer";
import { occasionsReducer } from "./reducers/occasionsReducer";
import { paymentsReducer } from "./reducers/paymentsReducer";
import { packagesReducer } from "./reducers/packagesReducer";
import { roleReducer } from "./reducers/roleReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const presistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["authReducer"],
};

const rootReducer = combineReducers({
  userReducer,
  authReducer,paymentsReducer,
  langaugesReducer,
  occasionsReducer,
  settings,
  bookingsReducer,
  packagesReducer,
  roleReducer,
});
const persistedReducer = persistReducer(presistConfig, rootReducer);

const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
let persistor = persistStore(store);

export { store, persistor };
