import { ExplorerAction, ExplorerState, ExplorerActionTypes, SelectedFileType, RepoInfo } from './explorer.types';

const INITIAL_STATE: ExplorerState = {
  repoUrl: '',
  repoInfo: {
    apiUrl: '',
    name: '',
    defaultBranch: ''
  },
  repoBranch: undefined,
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

    case ExplorerActionTypes.SetRepoBranch:
      return {
        ...state,
        repoBranch: action.payload as string
      };

    default: return state;
  }
}

export default explorerReducer;
