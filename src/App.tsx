import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router';
import IntroPage from './pages/intro/intro.page';
import ViewerPage from './pages/viewer/viewer.page';
import Header from './components/header/header.component';

function App() {
  return (
    <div className='application-container'>
      <Header />
      <div className='content'>
        <Switch>
          <Route exact path='/' component={IntroPage} />
          <Route exact path='/viewer' component={ViewerPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
