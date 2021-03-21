import { Input } from 'antd';
import React from 'react'
import './header.scss';

const Header = () => {
  return (
    <div className='header'>
      <Input placeholder='Paste your github repo url'></Input>
    </div>
  )
}

export default Header;
