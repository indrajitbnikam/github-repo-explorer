import { createSelector } from 'reselect';
import { GlobalReduxState } from '../store.types';
import { ExplorerState, RepoInfo } from './explorer.types';

const selectExplorerState = (state: GlobalReduxState) => state.explorer;

export const selectRepoUrl = createSelector(
  [selectExplorerState],
  (state: ExplorerState) => state.repoUrl
);

export const selectRepoInfo = createSelector(
  [selectExplorerState],
  (state: ExplorerState) => state.repoInfo
);

export const selectRepoApiUrl = createSelector(
  [selectRepoInfo],
  (state: RepoInfo) => state.apiUrl
);

export const selectRepoName = createSelector(
  [selectRepoInfo],
  (state: RepoInfo) => state.name
);

export const selectSelectedFile = createSelector(
  [selectExplorerState],
  (state: ExplorerState) => state.selectedFile
);
