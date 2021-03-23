import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import bookmarksReducer from './bookmarks/bookmarks.reducer';
import explorerReducer from './explorer/explorer.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['bookmarks']
}

const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
  explorer: explorerReducer
});

export default persistReducer(persistConfig, rootReducer);