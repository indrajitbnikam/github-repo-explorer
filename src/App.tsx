import React, { useState } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router';
import ViewerPage from './pages/viewer/viewer.page';
import Header from './components/header/header.component';

function App() {
  const [validRepoAPIUrl, setValidRepoAPIUrl] = useState<string>('');

  return (
    <div className='application-container'>
      <Header setValidRepoAPIUrl={setValidRepoAPIUrl} />
      <div className='content'>
        <Switch>
          {/* <Route exact path='/' component={IntroPage} /> */}
          <Route exact path='/' render={
            () => (
              <ViewerPage validRepoAPIUrl={validRepoAPIUrl}/>
            )
          } />
        </Switch>
      </div>
    </div>
  );
}

export default App;
