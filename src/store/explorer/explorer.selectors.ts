import { createSelector } from 'reselect';
import { GlobalReduxState } from '../store.types';
import { ExplorerState } from './explorer.types';

const selectExplorerState = (state: GlobalReduxState) => state.explorer;

export const selectRepoUrl = createSelector(
  [selectExplorerState],
  (state: ExplorerState) => state.repoUrl
);

export const selectRepoApiUrl = createSelector(
  [selectExplorerState],
  (state: ExplorerState) => state.repoApiUrl
);

export const selectSelectedFile = createSelector(
  [selectExplorerState],
  (state: ExplorerState) => state.selectedFile
);
