import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Loading from './components/loading';
// import Wrapper from './components/wrapper';

const App = () => {
  return (
    <div className="router">
      <main>
        <Switch>
          <Route exact path="/" component={Loading} />
          {/* <Route exact path="/analytics" component={Wrapper} /> */}
        </Switch>
      </main>
    </div>
  );
};

export default App;
