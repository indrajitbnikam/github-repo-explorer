import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import SplitPane from 'react-split-pane';
import FileExplorer from '../../components/file-explorer/file-explorer.component';
import FileViewer from '../../components/file-viewer/file-viewer.component';
import { setRepoUrl } from '../../store/explorer/explorer.actions';
import { AllActionTypes } from '../../store/store.types';
import './viewer.scss';

const ViewerPage: FC = ({ setRepoUrl }: any) => {

  const params = useParams<any>();

  useEffect(() => {
    let url = decodeURIComponent(params?.repositoryUrl || '');
    if (url) {
      setRepoUrl(url);
    } else {
      setRepoUrl('https://github.com/indrajitbnikam/github-repo-explorer');
    }
  }, [params, setRepoUrl]);

  const getDefaultSize = (): number => {
    // returns 300px base size
    if (!localStorage.getItem('splitPos')) return 300;
    return parseInt(localStorage.getItem('splitPos') as string, 10)
  }

  return (
    <div className='viewer-page-container'>
      <SplitPane
        split='vertical'
        style={{ height: 'calc(100% - 73px)' }}
        pane2Style={{ width: '100%', height: '100%' }}
        defaultSize={getDefaultSize()}
        onChange={(size) => localStorage.setItem('splitPos', `${size}`)} >
          <div className='file-explorer-container'>
            <FileExplorer />
          </div>
          <div className='file-viewer-container'>
            <FileViewer />
          </div>
      </SplitPane>
    </div>
  )
}

const mapDispatchToProps = (dispatch: (action: AllActionTypes) => void) => ({
  setRepoUrl: (url: string) => dispatch(setRepoUrl(url))
})

export default connect(null, mapDispatchToProps)(ViewerPage);
