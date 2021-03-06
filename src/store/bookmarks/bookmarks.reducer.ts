import { Bookmark, BookmarksAction, BookmarksActionTypes, BookmarksState } from './bookmarks.types';

const INITIAL_STATE: BookmarksState = {
  bookmarks: []
};

const bookmarksReducer = (state: BookmarksState = INITIAL_STATE, action: BookmarksAction): BookmarksState => {
  switch (action.type) {
    case BookmarksActionTypes.SaveBookmark:
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload as Bookmark]
      }

    case BookmarksActionTypes.DeleteBookmark:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(bm => bm.url !== (action.payload as string))
      }

    default: return state
  }
}

export default bookmarksReducer;