import { createSelector } from 'reselect';
import { GlobalReduxState } from '../store.types';
import { BookmarksState } from './bookmarks.types';

const selectBookmarksState = (state: GlobalReduxState) => state.bookmarks;

export const selectBookmarks = createSelector(
  [selectBookmarksState],
  (state: BookmarksState) => state.bookmarks
);

export const selectIsItBookmarked = memoize((url: string) => createSelector(
  [selectBookmarksState],
  (state: BookmarksState) => state.bookmarks.includes(url)
));
