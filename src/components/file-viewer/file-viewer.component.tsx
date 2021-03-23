import React, { FC, useEffect, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { fetchFileContent } from '../../services/github-api.service'
import { LangLine } from '@itassistors/langline';
import { LangData } from '@itassistors/langline/dist/lib/interface/LangDataInterface';
import { ErrorObject } from '@itassistors/langline/dist/lib/interface/ErrorInterface';
import { tomorrow as style } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSelectedFile } from '../../store/explorer/explorer.selectors';
import { SelectedFileType } from '../../store/explorer/explorer.types';

const FileViewer: FC = ({ selectedFile }: any) => {

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
    fetchFileData()
  }, [url])

  useEffect(() => {
    const language: LangData | ErrorObject = new LangLine().withFileName(name);
    let resolvedLanguageName = 'text'
    if ('prismIndicator' in language) {
      resolvedLanguageName = language?.prismIndicator as string;
    }
    setFileLanguage(resolvedLanguageName);
  }, [name])

  return (
    <div className='file-viewer'>
      {
        fileContent ? (
          <SyntaxHighlighter
            language={fileLanguage}
            style={style}
            customStyle={{ margin: '0' }}
            showLineNumbers >
            {fileContent}
          </SyntaxHighlighter>
        ) : null
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector<any, any>({
  selectedFile: selectSelectedFile
})

export default connect(mapStateToProps)(FileViewer);
