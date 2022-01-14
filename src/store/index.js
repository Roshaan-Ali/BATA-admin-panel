// import {createStore, combineReducers, applyMiddleware} from 'redux';
// // import {books_reducer} from './reducers/books_reducer';
// import {userReducer} from './reducer/userReducer'
// import thunk from "redux-thunk";
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// const presistConfig = {
//     key:'root',
//     storage:storage,
//     whitelist:['userReducer']
// }

// const rootReducer = combineReducers({userReducer});
// const persistedReducer = persistReducer(presistConfig, rootReducer);

// const store = createStore(persistedReducer,{},applyMiddleware(thunk));
// let persistor = persistStore(store);


// export {persistor,store};
