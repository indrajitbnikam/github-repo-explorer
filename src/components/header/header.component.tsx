import { Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { fetchRepoData } from '../../services/github-api.service';
import './header.scss';

const Header = ({ setValidRepoAPIUrl }: { setValidRepoAPIUrl: (url: string) => void }) => {
  const [repoUrl, setRepoUrl] = useState<string>('https://github.com/indrajitbnikam/github-repo-explorer');

  const converRepoUrlToAPIUrl = (repoUrl: string): string => {
    const userAndRepo = repoUrl.replace('https://github.com/', '');
    const [user, repo ] = userAndRepo.split('/');
    return `https://api.github.com/repos/${user}/${repo}/contents`;
  }

  useEffect(() => {
    const tryToSetValidUrl = async () => {
      try {
        if (repoUrl) {
          const apiUrl = converRepoUrlToAPIUrl(repoUrl);
          const result = await fetchRepoData(apiUrl);
          if (result.status === 200) {
            setValidRepoAPIUrl(apiUrl);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    tryToSetValidUrl();
  }, [repoUrl, setValidRepoAPIUrl])

  return (
    <div className='header'>
      <Input
        placeholder='Paste your github repo url'
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}></Input>
    </div>
  )
}

export default Header;
