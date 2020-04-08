import React, { Component, Fragment } from "react";

export default class App extends Component {
  state = { lapse: 0, running: false };

  componentDidMount() {
    this.onStart();
  }

  onStart = () => {
    this.setState(state => {
      if (state.running) {
        clearInterval(this.timer);
      } else {
        const startTime = Date.now() - this.state.lapse;
        this.timer = setInterval(() => {
          console.log(Date.now());
          this.setState({
            lapse: Date.now() - startTime
          });
        }, 3000);
      }
      return { running: !state.running };
    });
  };

  onClear = () => {
    clearInterval(this.timer);
    this.setState({ running: false, lapse: 0 });
  };

  render() {
    const { lapse, running } = this.state;
    return (
      <Fragment>
        <button onClick={this.onStart}>{running ? "Stop" : "Start"}</button>
        <button onClick={this.onClear}>Clear</button>
        <p className="result">Counter {lapse}</p>
      </Fragment>
    );
  }
}
