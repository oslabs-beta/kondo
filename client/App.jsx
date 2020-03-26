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
      heapTotalSize: 0,
      barGraphLabels: [],
      barGraphData: [],
      barGraphDetails: [],
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(data) {
    const newState = {
      lineGraphLabels: data.heapUsageOverTime.time,
      lineGraphData: data.heapUsageOverTime.heapUsage,
      heapTotalSize: data.heapUsageOverTime.totalHeapSize,
      barGraphLabels: data.memoryLeaks.labels,
      barGraphData: data.memoryLeaks.data,
      barGraphDetails: data.memoryLeaks.values,
    };
    this.setState(newState);
  }

  render() {
    return (
      <div className="router">
        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Loading updateState={this.updateState} />}
            />
            <Route
              exact
              path="/analytics"
              render={() => (
                <Wrapper
                  lineGraphLabels={this.state.lineGraphLabels}
                  lineGraphData={this.state.lineGraphData}
                  heapTotalSize={this.state.heapTotalSize}
                  barGraphLabels={this.state.barGraphLabels}
                  barGraphData={this.state.barGraphData}
                  barGraphDetails={this.state.barGraphDetails}
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
