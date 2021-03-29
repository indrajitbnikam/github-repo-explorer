import React, { FC } from 'react';
import CreateBadgeButton from '../create-badge-button/create-badge-button.component';
import SearchBar from '../search-bar/search-bar.component';
import './header.scss';
import Bookmarks from '../bookmarks/bookmarks.component';

const Header: FC = () => {

  return (
    <div className='header'>
      <div className='left-section'>
        <div className='bookmarks'>
          <Bookmarks />
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
