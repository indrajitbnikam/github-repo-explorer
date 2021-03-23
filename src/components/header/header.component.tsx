import React, { FC } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setRepoApiUrl, setRepoUrl } from '../../store/explorer/explorer.actions';
import { selectRepoUrl } from '../../store/explorer/explorer.selectors';
import { AllActionTypes } from '../../store/store.types';
import CreateBadgeButton from '../create-badge-button/create-badge-button.component';
import SearchBar from '../search-bar/search-bar.component';
import './header.scss';

const Header: FC = () => {

  return (
    <div className='header'>
      <div className='search-bar'>
        <SearchBar />
      </div>
      <div className='create-badge'>
        <CreateBadgeButton />
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector<any, any>({
  repoUrl: selectRepoUrl
});

const mapDispatchToProps = (dispatch: (action: AllActionTypes) => void) => ({
  setRepoUrl: (url: string) => dispatch(setRepoUrl(url)),
  setRepoApiUrl: (url: string) => dispatch(setRepoApiUrl(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
