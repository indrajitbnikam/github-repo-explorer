import axios, { AxiosRequestConfig } from 'axios';
import { RepoInfo } from '../store/explorer/explorer.types';

export const fetchRepoInfo = async (repoUrl: string, requestConfig?: AxiosRequestConfig) => {
  return axios.get(repoUrl, requestConfig)
          .then(response => {
            if (response.status === 200) {
              const { full_name, default_branch } = response.data;
              return {
                name: full_name,
                apiUrl: repoUrl,
                defaultBranch: default_branch
              } as RepoInfo;
            }
          });
}

export const fetchRepoContent = async (repoUrl: string, requestConfig?: AxiosRequestConfig) => {
  return axios.get(`${repoUrl}`, requestConfig);
}

export const fetchFileContent = async (fileUrl: string): Promise<string> => {
  return axios.get(fileUrl).then(({ data }) => data ? window.atob(data.content) : '');
}

export const fetchRepoBranches = async (repoApiUrl: string) => {
  return axios.get(`${repoApiUrl}/branches`);
}
