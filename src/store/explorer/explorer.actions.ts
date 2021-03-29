import { ExplorerActionTypes, ExplorerAction, SelectedFileType, RepoInfo } from './explorer.types';

export const setSelectedFile = (url: SelectedFileType): ExplorerAction => ({
  type: ExplorerActionTypes.SetSelectedFile,
  payload: url
});

export const setRepoUrl = (url: string): ExplorerAction => ({
  type: ExplorerActionTypes.SetRepoUrl,
  payload: url
});

export const setRepoInfo = (repoInfo: RepoInfo): ExplorerAction => ({
  type: ExplorerActionTypes.SetRepoInfo,
  payload: repoInfo
});

export const setRepoBranch = (branchName: string): ExplorerAction => ({
  type: ExplorerActionTypes.SetRepoBranch,
  payload: branchName
});
