export enum ExplorerActionTypes {
  SetSelectedFile = '[Explorer] Select File',
  SetRepoUrl = '[Explorer] Set Repository URL',
  SetRepoInfo = '[Explorer] Set Repository Info'
};

export type SelectedFileType = {
  url: string;
  name: string;
}

export type RepoInfo = {
  apiUrl: string;
  name: string;
}

export interface ExplorerAction {
  type: ExplorerActionTypes;
  payload?: string | SelectedFileType | RepoInfo;
}

export interface ExplorerState {
  repoUrl: string;
  repoInfo: RepoInfo,
  selectedFile: SelectedFileType;
}