import { BookmarksState, BookmarksAction } from "./bookmarks/bookmarks.types";
import { ExplorerAction, ExplorerState } from "./explorer/explorer.types";

export interface GlobalReduxState {
  bookmarks: BookmarksState,
  explorer: ExplorerState
}

export type AllActionTypes = BookmarksAction | ExplorerAction;