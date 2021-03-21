import React, { useEffect, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { fetchFileContent } from '../../services/github-api.service'
import { LangLine } from '@itassistors/langline';
import { LangData } from '@itassistors/langline/dist/lib/interface/LangDataInterface';
import { ErrorObject } from '@itassistors/langline/dist/lib/interface/ErrorInterface';
import { tomorrow as style } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const FileViewer = (
  { fileUrl, fileName }:
  { fileUrl: string, fileName: string }
) => {

  const [fileContent, setFileContent] = useState<string>('');
  const [fileLanguage, setFileLanguage ] = useState<string>('text');

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const fileContent = await fetchFileContent(fileUrl);
        setFileContent(fileContent);
      } catch (error) {
        console.error(error);
      }
    }
    fetchFileData()
  }, [fileUrl])

  useEffect(() => {
    const language: LangData | ErrorObject = new LangLine().withFileName(fileName);
    let resolvedLanguageName = 'text'
    if ('prismIndicator' in language) {
      resolvedLanguageName = language?.prismIndicator as string;
    }
    setFileLanguage(resolvedLanguageName);
  }, [fileName])

  return (
    <div className='file-viewer'>
      {/* {fileContent} */}
      <SyntaxHighlighter
        language={fileLanguage}
        style={style}
        customStyle={{margin: '0'}}
        showLineNumbers >
        {fileContent}
      </SyntaxHighlighter>
    </div>
  )
}

export default FileViewer
