import { Input } from 'antd';
import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchRepoData } from '../../services/github-api.service';
import { converRepoUrlToAPIUrl } from '../../shared/utils';
import { setRepoApiUrl, setRepoUrl } from '../../store/explorer/explorer.actions';
import { selectRepoUrl } from '../../store/explorer/explorer.selectors';
import { AllActionTypes } from '../../store/store.types';
import './search-bar.scss';

const SearchBar: FC = ({ repoUrl, setRepoUrl, setRepoApiUrl }: any) => {
  useEffect(() => {
    const tryToSetValidUrl = async () => {
      try {
        if (repoUrl) {
          const apiUrl = converRepoUrlToAPIUrl(repoUrl);
          const result = await fetchRepoData(apiUrl);
          if (result.status === 200) {
            setRepoApiUrl(apiUrl);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    tryToSetValidUrl();
  }, [repoUrl, setRepoApiUrl]);

  return (
    <Input
      placeholder='Paste your github repo url'
      value={repoUrl}
      onChange={(e) => setRepoUrl(e.target.value)} />
  )
}

const mapStateToProps = createStructuredSelector<any, any>({
  repoUrl: selectRepoUrl
});

const mapDispatchToProps = (dispatch: (action: AllActionTypes) => void) => ({
  setRepoUrl: (url: string) => dispatch(setRepoUrl(url)),
  setRepoApiUrl: (url: string) => dispatch(setRepoApiUrl(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
