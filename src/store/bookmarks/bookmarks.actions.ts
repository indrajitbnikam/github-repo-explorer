import { BookmarksActionTypes } from './bookmarks.types';

export const saveBookmark = (url: string) => ({
  type: BookmarksActionTypes.SaveBookmark,
  payload: url
});

export const deleteBookmark = (url: string) => ({
  type: BookmarksActionTypes.DeleteBookmark
});