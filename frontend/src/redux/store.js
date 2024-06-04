import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer,persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
// persist reducer is used to set the redux info in the local storage and
//  we use combinend reducer and persistant reducer to set up this 

const rootReducer = combineReducers({
  user: userReducer
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: {
    user: persistedReducer
  },
});

export default store;
export const persistor = persistStore(store)