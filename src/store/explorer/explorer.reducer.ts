import { ExplorerAction, ExplorerState, ExplorerActionTypes, SelectedFileType } from './explorer.types';

const INITIAL_STATE: ExplorerState = {
  repoUrl: '',
  repoApiUrl: '',
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

    case ExplorerActionTypes.SetRepoApiUrl:
      return {
        ...state,
        repoApiUrl: action.payload as string
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
