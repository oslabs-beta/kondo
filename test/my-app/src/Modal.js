import React from 'react';
import './index.css';


const display = {
  display: 'flex'
  
};
const hide = {
  display: 'none'
};

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      toggle: true
    }
  }
  componentDidUpdate() {
     window.addEventListener('message', this.onMessage);
  }
  onMessage() {
    console.log('On message')
  }
  toggle(event) {
    this.setState((prevState) => ({
      toggle: !prevState.toggle
    }));
  }
  render() {
    var modal = [];
    modal.push(
      <div className="modal" style={this.state.toggle ? display : hide}>
      <div className="modal-content">
        <h4>Modal Header</h4>
      </div>
      <div className="modal-footer">
        <a className="btn-flat" onClick={this.toggle}>Agree</a>
      </div>
    </div>
    );
    return (
      <div>
        <a className="btn" onClick={this.props.onToggle}>{this.state.toggle ? 'Close modal' : 'Open modal'}</a>
        {modal}
      </div>
    );
  }
}

