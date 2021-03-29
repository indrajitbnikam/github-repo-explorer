import { ExplorerAction, ExplorerState, ExplorerActionTypes, SelectedFileType, RepoInfo } from './explorer.types';

const INITIAL_STATE: ExplorerState = {
  repoUrl: '',
  repoInfo: {
    apiUrl: '',
    name: ''
  },
  selectedFile: {
    name: '',
    url: ''
  }
};

const explorerReducer = (state: ExplorerState = INITIAL_STATE, action: ExplorerAction): ExplorerState => {
  switch (action.type) {
    case ExplorerActionTypes.SetRepoUrl:
      return {
        ...state,
        repoUrl: action.payload as string
      };

    case ExplorerActionTypes.SetRepoInfo:
      return {
        ...state,
        repoInfo: action.payload as RepoInfo
      };

    case ExplorerActionTypes.SetSelectedFile:
      return {
        ...state,
        selectedFile: action.payload as SelectedFileType
      };

    default: return state;
  }
}

export default explorerReducer;
