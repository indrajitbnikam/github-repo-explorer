export enum BookmarksActionTypes {
  SaveBookmark = '[Bookmarks] Save',
  DeleteBookmark = '[Bookmarks] Delete'
};

export interface BookmarksAction {
  type: BookmarksActionTypes,
  payload?: string
}

export interface BookmarksState {
  bookmarks: string[]
}