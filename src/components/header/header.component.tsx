import React, { FC } from 'react';
import CreateBadgeButton from '../create-badge-button/create-badge-button.component';
import SearchBar from '../search-bar/search-bar.component';
import BranchSelector from '../branch-selector/branch-selector.component';
import './header.scss';

const Header: FC = () => {

  return (
    <div className='header'>
      <div className='left-section'>
        <div className='branch-selector'>
          <BranchSelector />
        </div>
        <div className='search-bar'>
          <SearchBar />
        </div>
      </div>
      <div className='right-section'>
        <div className='create-badge'>
          <CreateBadgeButton />
        </div>
      </div>
    </div>
  )
}

export default Header;
