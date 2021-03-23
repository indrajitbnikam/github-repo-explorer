export enum ExplorerActionTypes {
  SetSelectedFile = '[Explorer] Select File',
  SetRepoUrl = '[Explorer] Set Repository URL',
  SetRepoApiUrl = '[Explorer] Set Repository API URL'
};

export type SelectedFileType = {
  url: string;
  name: string;
}

export interface ExplorerAction {
  type: ExplorerActionTypes;
  payload?: string | SelectedFileType;
}

export interface ExplorerState {
  repoUrl: string;
  repoApiUrl: string;
  selectedFile: SelectedFileType;
}