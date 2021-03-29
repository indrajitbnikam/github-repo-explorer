import React, { FC } from 'react'
import { Input } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setRepoUrl } from '../../store/explorer/explorer.actions';
import { selectRepoUrl } from '../../store/explorer/explorer.selectors';
import { AllActionTypes } from '../../store/store.types';
import './search-bar.scss';

const SearchBar: FC = ({ repoUrl, setRepoUrl }: any) => {
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
  setRepoUrl: (url: string) => dispatch(setRepoUrl(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
