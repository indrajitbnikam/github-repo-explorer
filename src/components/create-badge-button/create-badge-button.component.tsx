import { Button, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import './create-badge-button.scss'
import Paragraph from 'antd/lib/typography/Paragraph';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectRepoUrl } from '../../store/explorer/explorer.selectors';

const CreateBadgeButton = ({ repoUrl }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pastedUrl, setPastedUrl] = useState<string>('');

  useEffect(() => {
    setPastedUrl(repoUrl);
  }, [repoUrl, modalVisible])

  const handleCancel = () => {
    setModalVisible(false);
  }

  const getBadgeUrl = (url: string): string => {
    const usersEncodedRepoUrl = encodeURIComponent(url);
    const exploreBadgeUrl = 'https://img.shields.io/badge/Explore%20my%20repo%20-github--repo--explorer-green?style=flat-square&logo=github';
    const ourProjectRepoUrl = 'https://indrajitbnikam.github.io/github-repo-explorer/#/';

    const constructedBadgeText = `[![Website](${exploreBadgeUrl})](${ourProjectRepoUrl}${usersEncodedRepoUrl})`;
    return constructedBadgeText;
  }

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>
          Create a badge 🚀
      </Button>
      <Modal
        title="Paste your github repository url here,"
        centered
        visible={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type='primary' onClick={handleCancel}>
            OK
          </Button>
        ]}
      >
        <Input
          value={pastedUrl}
          onChange={(e) => setPastedUrl(e.target.value)}
          placeholder='i.e. https://github.com/indrajitbnikam/github-repo-explorer'/>
        {
          pastedUrl ? (
            <>
              <br />
              <br />
              <p>Copy following line to your readme.md file 👇</p>
              <Paragraph type='secondary' copyable>
                {getBadgeUrl(pastedUrl)}
              </Paragraph>
            </>
          ) : null
        }
      </Modal>
    </div>
  )
}

const mapStateToProps = createStructuredSelector<any, any>({
  repoUrl: selectRepoUrl
})

export default connect(mapStateToProps)(CreateBadgeButton)
