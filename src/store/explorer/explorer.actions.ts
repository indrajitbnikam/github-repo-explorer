import { ExplorerActionTypes, ExplorerAction, SelectedFileType } from './explorer.types';

export const setSelectedFile = (url: SelectedFileType): ExplorerAction => ({
  type: ExplorerActionTypes.SetSelectedFile,
  payload: url
});

export const setRepoUrl = (url: string): ExplorerAction => ({
  type: ExplorerActionTypes.SetRepoUrl,
  payload: url
});

export const setRepoApiUrl = (url: string): ExplorerAction => ({
  type: ExplorerActionTypes.SetRepoApiUrl,
  payload: url
});
