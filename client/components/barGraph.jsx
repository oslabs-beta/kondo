import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { ListGroup, Modal } from 'react-bootstrap';

class BarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      idx: undefined,
      element: '',
      details: [],
    };

    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal(event, item) {
    const index = item[0]._index;
    this.setState({
      showModal: true,
      idx: index,
      element: this.props.labels[index],
      details: this.props.details[index],
    });
  }
  render() {
    const { details } = this.state;
    const properties = details.map((property, i) => {
      return (
        <ListGroup.Item key={i}>
          Name: {property.name}
          <br />
          Type: {property.type} <br />
          Value: {property.value}
        </ListGroup.Item>
      );
    });

    return (
      <div className="barGraph">
        <Modal
          show={this.state.showModal}
          onHide={() => {
            this.setState({ showModal: false });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.element} Properties</Modal.Title>
          </Modal.Header>
          <ListGroup variant="flush">{properties}</ListGroup>
        </Modal>
        <Bar
          data={{
            labels: this.props.labels,
            datasets: [
              {
                label: 'Snapshot 1',
                data: this.props.data.snapshot0,
                backgroundColor: 'rgba(104,245,196,1)',
              },
              {
                label: 'Snapshot 2',
                data: this.props.data.snapshot1,
                backgroundColor: 'rgba(104,245,196,0.86)',
              },
              {
                label: 'Snapshot 3',
                data: this.props.data.snapshot2,
                backgroundColor: 'rgba(104,245,196,0.72)',
              },
              {
                label: 'Snapshot 4',
                data: this.props.data.snapshot3,
                backgroundColor: 'rgba(104,245,196,0.68)',
              },
              {
                label: 'Snapshot 5',
                data: this.props.data.snapshot4,
                backgroundColor: 'rgba(104,245,196,0.54)',
              },
              {
                label: 'Snapshot 6',
                data: this.props.data.snapshot5,
                backgroundColor: 'rgba(104,245,196,0.40)',
              },
              {
                label: 'Snapshot 7',
                data: this.props.data.snapshot6,
                backgroundColor: 'rgba(104,245,196,0.26)',
              },
            ],
          }}
          options={{
            onClick: this.toggleModal,
            legend: {
              display: true,
              position: 'right',
              labels: {
                borderWidth: 1,
                fontColor: 'black',
              },
            },
            scales: {
              xAxes: [
                {
                  stacked: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Possible Memory Leaks',
                  },
                },
              ],
              yAxes: [
                {
                  stacked: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'References (per snapshot)',
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}

export default BarGraph;
