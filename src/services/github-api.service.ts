import axios, { AxiosRequestConfig } from 'axios';
import { RepoInfo } from '../store/explorer/explorer.types';

export const fetchRepoInfo = async (repoUrl: string, requestConfig?: AxiosRequestConfig) => {
  return axios.get(repoUrl, requestConfig)
          .then(response => {
            if (response.status === 200) {
              const { full_name } = response.data;
              return {
                name: full_name,
                apiUrl: repoUrl
              } as RepoInfo;
            }
          });
}

export const fetchRepoContent = async (repoUrl: string, requestConfig?: AxiosRequestConfig) => {
  return axios.get(`${repoUrl}/contents`, requestConfig);
}

export const fetchFileContent = async (fileUrl: string): Promise<string> => {
  return axios.get(fileUrl).then(({ data }) => data ? window.atob(data.content) : '');
}
