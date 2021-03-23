import axios from 'axios';

export const fetchRepoData = async (repoUrl: string) => {
  return axios.get(repoUrl);
};

export const fetchFileContent = async (fileUrl: string): Promise<string> => {
  return axios.get(fileUrl).then(({ data }) => data ? window.atob(data.content) : '');
}
