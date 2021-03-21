import React, { useState } from 'react'
import SplitPane from 'react-split-pane';
import FileExplorer from '../../components/file-explorer/file-explorer.component';
import FileViewer from '../../components/file-viewer/file-viewer.component';
import './viewer.scss';

const ViewerPage = ({ validRepoAPIUrl }: { validRepoAPIUrl: string }) => {
  const [selectedFile, setSelectedFileUrl] = useState<{url: string, name: string}>({
    name: 'text',
    url: ''
  });

  return (
    <div className='viewer-page-container'>
      <SplitPane
        split='vertical'
        style={{ height: 'calc(100% - 73px)' }}
        pane2Style={{ width: '100%', height: '100%' }}
        defaultSize={parseInt(localStorage.getItem('splitPos') as string, 10)}
        onChange={(size) => localStorage.setItem('splitPos', `${size}`)} >
          <div className='file-explorer-container'>
            <FileExplorer repoUrl={validRepoAPIUrl} selectFile={setSelectedFileUrl}/>
          </div>
          <div className='file-viewer-container'>
            <FileViewer fileUrl={selectedFile.url} fileName={selectedFile.name}/>
          </div>
      </SplitPane>
    </div>
  )
}

export default ViewerPage;
