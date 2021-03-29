import React from 'react';
import { StarTwoTone } from '@ant-design/icons';
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import { Bookmark } from '../../store/bookmarks/bookmarks.types';
import './bookmarks.scss';
import { selectBookmarks, selectIsItBookmarked } from '../../store/bookmarks/bookmarks.selectors';
import { connect } from 'react-redux';
import { deleteBookmark, saveBookmark } from '../../store/bookmarks/bookmarks.actions';
import { selectRepoName, selectRepoUrl } from '../../store/explorer/explorer.selectors';
import { createStructuredSelector } from 'reselect';
import { setRepoUrl } from '../../store/explorer/explorer.actions';
import { AllActionTypes } from '../../store/store.types';

const Bookmarks = ({ repoName, repoUrl, bookmarks, isItBookmarked, saveBookmark, deleteBookmark, setRepoUrl }: any) => {

  const handleSelectNewBookmark = (event: any) => {
    setRepoUrl(event.key);
  }

  const handleToggleBookmarkState = (bookmark: Bookmark, alreadyBookmarked: boolean) => {
    if (alreadyBookmarked) {
      deleteBookmark(bookmark.url);
    } else {
      saveBookmark(bookmark)
    }
  }

  const getMenu = (bookmarks: Bookmark[]) => {
    return (
      <Menu onClick={handleSelectNewBookmark}>
        {
          bookmarks.length ? (
            bookmarks.map(bm => (
              <Menu.Item key={bm.url}>
                {bm.name}
              </Menu.Item>
            ))
          ) : null
        }
      </Menu>
    )
  }

  return (
    <div className='bookmarks-container'>
      <div className="bookmark-dropdown">
        <Dropdown overlay={getMenu(bookmarks)}>
          <Button>
            Bookmarks
          </Button>
        </Dropdown>
      </div>
      <div className="bookmark-toggle">
        <Tooltip title={isItBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}>
          <StarTwoTone
            style={{fontSize: '20px', cursor: 'pointer'}}
            twoToneColor={isItBookmarked ? '#2d9aff' : '#bebebe'}
            onClick={() => handleToggleBookmarkState({name: repoName, url: repoUrl} as Bookmark, isItBookmarked)}
            />
        </Tooltip>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector<any, any>({
  repoName: selectRepoName,
  repoUrl: selectRepoUrl,
  bookmarks: selectBookmarks,
  isItBookmarked: selectIsItBookmarked
});

const mapDispatchToProps = (dispatch: (action: AllActionTypes) => void) => ({
  saveBookmark: (bookmark: Bookmark) => dispatch(saveBookmark(bookmark)),
  deleteBookmark: (url: string) => dispatch(deleteBookmark(url)),
  setRepoUrl: (url: string) => dispatch(setRepoUrl(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);