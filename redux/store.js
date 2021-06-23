import {
  configureStore,
  combineReducers,
  getDefaultMiddleware
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import globalReducer from './slices/globalSlice';
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';
import messageReducer from './slices/messageSlice';
import profileReducer from './slices/profileSlice';
const reducers = combineReducers({
  user: userReducer,
  global: globalReducer,
  post: postReducer,
  message: messageReducer,
  profile: profileReducer
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blackList: ['user']
};

const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      /* ignore persistance actions */
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});
