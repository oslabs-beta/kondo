import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Loading from './components/loading';
import Wrapper from './components/wrapper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineGraphLabels: [],
      lineGraphData: [],
      comparisonGraphLabels: [],
      comparisonGraphData: [],
    };
  }

  render() {
    return (
      <div className="router">
        <main>
          <Switch>
            <Route exact path="/" component={Loading} />
            <Route
              exact
              path="/analytics"
              render={() => <Wrapper test="testing" />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
