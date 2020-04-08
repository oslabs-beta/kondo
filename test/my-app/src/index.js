import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import Modal from "./Modal.js";
// Styles
import "./index.css";

class App extends Component {
  constructor() {
    super()
  this.state = { showModal: true };
  this.promiseLk = this.promiseLk.bind(this)
  }
  promiseLk = n => {
    function signal(i) {
      return new Promise(cb => setImmediate(() => cb(i)))
    }
    return signal(n).then(i => {
      if (i % 1000 == 0) console.log(i)
      return this.promiseLk(n + 1)
    })  
  }
  onToggle = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <div className="app">
        <h1>Bad Modal</h1>
        {showModal ? <Modal onToggle={this.onToggle} /> : null}
        <button onClick={this.onToggle}>Click me</button>
        <button onClick={() => this.promiseLk(0)}>BrokenPromise</button>

      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
