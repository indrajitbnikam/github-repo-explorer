import React, { FC, Key, useEffect, useState } from 'react'
import { Tree } from 'antd';
import { DataNode, EventDataNode } from 'rc-tree/lib/interface';
import { fetchRepoData } from '../../services/github-api.service';
import { createFileTree, sortFileDirectory, updateTreeData } from './file-explorer.service';
import { createStructuredSelector } from 'reselect';
import { selectRepoApiUrl } from '../../store/explorer/explorer.selectors';
import { SelectedFileType } from '../../store/explorer/explorer.types';
import { setSelectedFile } from '../../store/explorer/explorer.actions';
import { AllActionTypes } from '../../store/store.types';
import { connect } from 'react-redux';
const { DirectoryTree } = Tree;

const FileExplorer: FC = ({ repoApiUrl, setSelectFile }: any) => {
  const [fileTree, setFileTree] = useState<DataNode[]>([])

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (!repoApiUrl) return;
        const { data } = await fetchRepoData(repoApiUrl);
        const initialFileTree = sortFileDirectory(createFileTree(data));
        setFileTree(initialFileTree);
      } catch (error) {
        console.error(error);
      }
    }
    fetchInitialData()
  }, [repoApiUrl])

  const onExpandAsync = async (treeNode: EventDataNode) => {
    try {
      const { data } = await fetchRepoData(treeNode.key as string);
      const updatedFileTree = updateTreeData(fileTree, treeNode.key as string, sortFileDirectory(createFileTree(data)));
      setFileTree(updatedFileTree);
    } catch (error) {
      console.error(error);
    }
  }

  const onSelect = (selectedKeys: Key[], info: any) => {
    if (info.node.isLeaf) {
      const selectedFileInfo: SelectedFileType = {
        url: selectedKeys[0] as string,
        name: info.selectedNodes[0].title
      }

      setSelectFile(selectedFileInfo);
    }
  }

  return (
    <div className='file-explorer'>
      <DirectoryTree
        loadData={onExpandAsync}
        onSelect={onSelect}
        treeData={fileTree}
      >
      </DirectoryTree>
    </div>
  )
}

const mapStateToProps = createStructuredSelector<any, any>({
  repoApiUrl: selectRepoApiUrl
})

const mapDispatchToProps = (dispatch: (action: AllActionTypes) => void) => ({
  setSelectFile: (selectedFile: SelectedFileType) => dispatch(setSelectedFile(selectedFile))
})

export default connect(mapStateToProps, mapDispatchToProps)(FileExplorer);
