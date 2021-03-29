import React, { FC } from 'react';
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

export default Header;
