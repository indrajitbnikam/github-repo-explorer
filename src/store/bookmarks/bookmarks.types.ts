export enum BookmarksActionTypes {
  SaveBookmark = '[Bookmarks] Save',
  DeleteBookmark = '[Bookmarks] Delete'
};

export interface BookmarksAction {
  type: BookmarksActionTypes,
  payload?: string | Bookmark
}

export interface Bookmark {
  name: string;
  url: string;
}
export interface BookmarksState {
  bookmarks: Bookmark[]
}