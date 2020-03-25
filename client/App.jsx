import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Loading from './components/loading';
import Wrapper from './components/wrapper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineGraphLabels: [
        0,
        2000,
        4000,
        6000,
        8000,
        10000,
        12000,
        14000,
        16000,
        18000,
        20000,
      ],
      lineGraphData: [
        922568,
        2710240,
        2710240,
        2710240,
        2925620,
        2925160,
        2925748,
        2926336,
        2928688,
        2929276,
        2929864,
      ],
      heapTotalSize: 5017600,
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
              render={() => (
                <Wrapper
                  lineGraphLabels={this.state.lineGraphLabels}
                  lineGraphData={this.state.lineGraphData}
                  heapTotalSize={this.state.heapTotalSize}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
