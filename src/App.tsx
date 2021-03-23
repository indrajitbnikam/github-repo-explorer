import React from 'react';
import './App.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import viewerPage from './pages/viewer/viewer.page';
import Header from './components/header/header.component';

function App() {
  return (
    <div className='application-container'>
      <Header/>
      <div className='content'>
        <Switch>
          <Route exact path={['/', '/:repositoryUrl']} component={viewerPage}/>
          <Redirect path='*' to='/' />
        </Switch>
      </div>
    </div>
  );
}

export default App;
