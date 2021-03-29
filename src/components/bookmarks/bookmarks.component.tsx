import React from 'react';
import { InfoCircleTwoTone, PushpinTwoTone } from '@ant-design/icons';
import { Button, Dropdown, Menu, notification, Popover, Tooltip } from 'antd';
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
    notification.info({
      message: 'Info',
      description: 'Switched repository!',
      placement: 'bottomRight'
    });
  }

  const handleToggleBookmarkState = (bookmark: Bookmark, alreadyBookmarked: boolean) => {
    if (alreadyBookmarked) {
      deleteBookmark(bookmark.url);
      notification.info({
        message: 'Unpinned repository',
        description: bookmark.name,
        icon: <PushpinTwoTone twoToneColor='#bebebe' />,
        placement: 'bottomRight'
      });
    } else {
      saveBookmark(bookmark);
      notification.info({
        message: 'Pinned repository',
        description: bookmark.name,
        icon: <PushpinTwoTone />,
        placement: 'bottomRight'
      });
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

  const pinnedRepoExtraInfo = (
    <div>
      <p>Pinned repos can be accessed through this dropdown.</p>
      <p>You can unpin these anytime.</p>
      <p>Pinned repos will be saved locally in localstorage.</p>
    </div>
  )

  return (
    <div className='bookmarks-container'>
      <div className="bookmark-dropdown">
        <Dropdown overlay={getMenu(bookmarks)} disabled={!bookmarks.length} trigger={['click']}>
          <Button>
            <PushpinTwoTone /> Pinned repos
          </Button>
        </Dropdown>
        <Popover content={pinnedRepoExtraInfo} title='What are pinned repos?' trigger='hover'>
          <InfoCircleTwoTone twoToneColor='#bebebe' style={{marginLeft: '10px'}}/>
        </Popover>
      </div>
      <div className="bookmark-toggle">
        <Tooltip title={isItBookmarked ? 'Unpin this repo' : 'Pin this repo'}>
          <PushpinTwoTone
            style={{fontSize: '20px', cursor: 'pointer'}}
            twoToneColor={isItBookmarked ? undefined : '#bebebe'}
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