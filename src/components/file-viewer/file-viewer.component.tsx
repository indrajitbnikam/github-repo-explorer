import React, { FC, useEffect, useState } from 'react'
import { fetchFileContent } from '../../services/github-api.service'
import { LangLine } from '@itassistors/langline';
import { LangData } from '@itassistors/langline/dist/lib/interface/LangDataInterface';
import { ErrorObject } from '@itassistors/langline/dist/lib/interface/ErrorInterface';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectRepoApiUrl, selectRepoBranch, selectSelectedFile } from '../../store/explorer/explorer.selectors';
import { SelectedFileType } from '../../store/explorer/explorer.types';
import Editor from '@monaco-editor/react';
import './file-viewer.scss';
const languageMap = require('language-map');

const FileViewer: FC = ({ selectedFile, repoApiUrl, repoBranch }: any) => {

  const { name, url } = selectedFile as SelectedFileType;

  const [fileContent, setFileContent] = useState<string>('');
  const [fileLanguage, setFileLanguage] = useState<string>('text');

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        if (!url) return;
        const fileContent = await fetchFileContent(url);
        setFileContent(fileContent);
      } catch (error) {
        console.error(error);
      }
    }
    fetchFileData();
  }, [url])

  useEffect(() => {
    setFileContent('');
    setFileLanguage('text');
  }, [repoApiUrl, repoBranch]);

  useEffect(() => {
    const language: LangData | ErrorObject = new LangLine().withFileName(name);
    let resolvedLanguageName = 'text';

    const langDetail = languageMap[(language as LangData)?.name];

    if (langDetail && 'aceMode' in langDetail) {
      resolvedLanguageName = langDetail?.aceMode;
    }

    // Expections
    switch (name.split('.').pop()) {
      case 'tsx':
      case 'ts':
        resolvedLanguageName='typescript'
        break;

      case 'jsx':
        resolvedLanguageName='javascript'
        break;

      case 'md':
        resolvedLanguageName='markdown'
        break;

      default:
        break;
    }

    setFileLanguage(resolvedLanguageName);
    console.log(language, languageMap[(language as LangData)?.name], resolvedLanguageName);
  }, [name]);

  return (
    <div className='file-viewer'>
      {
        fileContent ? (
          <Editor
            options={{
              readOnly: true
            }}
            height='100%'
            width='100%'
            value={fileContent}
            language={fileLanguage}
            theme='vs-dark'
          />
        ) : null
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector<any, any>({
  selectedFile: selectSelectedFile,
  repoApiUrl: selectRepoApiUrl,
  repoBranch: selectRepoBranch
})

export default connect(mapStateToProps)(FileViewer);
