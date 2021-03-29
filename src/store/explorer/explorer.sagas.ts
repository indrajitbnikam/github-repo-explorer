import { all, call, put, takeLatest } from 'typed-redux-saga';
import { fetchRepoInfo } from '../../services/github-api.service';
import { converRepoUrlToAPIUrl } from '../../shared/utils';
import { setRepoBranch, setRepoInfo } from './explorer.actions';
import { ExplorerAction, ExplorerActionTypes, RepoInfo } from './explorer.types';
import { notification } from 'antd';

export function* onSetRepoUrl() {
  yield* takeLatest(ExplorerActionTypes.SetRepoUrl, fetchAndSaveRepoInfo);
}

function* fetchAndSaveRepoInfo(action: ExplorerAction): Generator {
  try {
    const repoApiUrl: string = converRepoUrlToAPIUrl(action.payload as string);
    const repoInfo: RepoInfo = yield* call<(url: string, requestConfig?: any) => Promise<any>>(fetchRepoInfo, repoApiUrl);
    yield* put(setRepoInfo(repoInfo));

    const branchName: string = repoInfo.defaultBranch;
    yield* put(setRepoBranch(branchName));
  } catch (error) {
    console.warn(error);
    notification.error({
      message: 'Oops',
      description: 'Invalid repository URL!',
      placement: 'bottomRight'
    });
  }
}

export default function* explorerSagas() {
  yield* all([
    call(onSetRepoUrl)
  ]);
}