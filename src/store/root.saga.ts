import { all, call } from 'redux-saga/effects';
import bookmarksSagas from './bookmarks/bookmarks.sagas';
import explorerSagas from './explorer/explorer.sagas';

export default function* rootSaga() {
  yield all([
    call(bookmarksSagas),
    call(explorerSagas)
  ]);
}