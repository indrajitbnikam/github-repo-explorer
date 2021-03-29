import { Bookmark, BookmarksActionTypes } from './bookmarks.types';

export const saveBookmark = (bookmark: Bookmark) => ({
  type: BookmarksActionTypes.SaveBookmark,
  payload: bookmark
});

export const deleteBookmark = (url: string) => ({
  type: BookmarksActionTypes.DeleteBookmark,
  payload: url
});