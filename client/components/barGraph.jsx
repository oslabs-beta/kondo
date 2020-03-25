import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super();
    this.state = {
      chartData: {
        labels: ['San Francisco', 'Los Angeles', 'San Diego', 'Modesto'],
        datasets: [
          {
            label: 'Population',
            data: [870044, 3959657, 1401932, 211336],
          },
        ],
      },
    };
  }
  render() {
    return (
      <div className="chart">
        <Bar data={this.state.chartData} options={{}} />
      </div>
    );
  }
}

export default Chart;
