import React, { Key, useEffect, useState } from 'react'
import { Tree } from 'antd';
import { DataNode, EventDataNode } from 'rc-tree/lib/interface';
import { fetchRepoData } from '../../services/github-api.service';
import { createFileTree, sortFileDirectory, updateTreeData } from './file-explorer.service';
const { DirectoryTree } = Tree;

const FileExplorer = (
  { repoUrl, selectFile }:
  { repoUrl: string, selectFile: (val: {url: string, name: string}) => void }
) => {
  const [fileTree, setFileTree] = useState<DataNode[]>([])

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data } = await fetchRepoData(repoUrl);
        const initialFileTree = sortFileDirectory(createFileTree(data));
        setFileTree(initialFileTree);
      } catch (error) {
        console.error(error);
      }
    }
    fetchInitialData()
  }, [repoUrl])

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
      selectFile({
        url: selectedKeys[0] as string,
        name: info.selectedNodes[0].title
      });
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

export default FileExplorer
