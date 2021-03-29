import { createSelector } from 'reselect';
import { selectRepoUrl } from '../explorer/explorer.selectors';
import { GlobalReduxState } from '../store.types';
import { Bookmark, BookmarksState } from './bookmarks.types';

const selectBookmarksState = (state: GlobalReduxState) => state.bookmarks;

export const selectBookmarks = createSelector(
  [selectBookmarksState],
  (state: BookmarksState) => state.bookmarks
);

export const selectIsItBookmarked = createSelector(
  [selectBookmarks, selectRepoUrl],
  (state: Bookmark[], repoUrl: string) => state.find(bm => bm.url === repoUrl) !== undefined
);
