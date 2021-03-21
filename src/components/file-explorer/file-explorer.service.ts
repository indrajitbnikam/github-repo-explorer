import { DataNode } from "rc-tree/lib/interface";
import { Key } from "react";

export const createFileTree = (gitRepoData: any[]): DataNode[] => {
  const fileTree = gitRepoData.map<DataNode>(item => ({
    key: item.url,
    title: item.name,
    isLeaf: item.type === 'file',
  }))
  return fileTree;
}

export const sortFileDirectory = (fileTree: DataNode[]): DataNode[] => {
  fileTree.sort(customFileTreeSort);
  return fileTree;
}

const customFileTreeSort = (node1: DataNode, node2: DataNode): number => {
  if (!node1.isLeaf && node2.isLeaf) { return -1 }
  else if (node1.isLeaf && !node2.isLeaf) { return 1 }
  else return 0;
}

export const updateTreeData = (currentTree: DataNode[], key: Key, children: DataNode[]): DataNode[] => {
  return currentTree.map(node => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
}
