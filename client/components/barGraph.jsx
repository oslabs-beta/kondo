import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraph = props => {
  return (
    <div className="barGraph">
      <Bar
        data={{
          labels: props.labels,
          datasets: [
            {
              label: 'Snapshot 1',
              data: props.data.snapshot0,
              backgroundColor: 'red',
            },
            {
              label: 'Snapshot 2',
              data: props.data.snapshot1,
              backgroundColor: 'orange',
            },
            {
              label: 'Snapshot 3',
              data: props.data.snapshot2,
              backgroundColor: 'yellow',
            },
            {
              label: 'Snapshot 4',
              data: props.data.snapshot3,
              backgroundColor: 'green',
            },
            {
              label: 'Snapshot 5',
              data: props.data.snapshot4,
              backgroundColor: 'blue',
            },
            {
              label: 'Snapshot 6',
              data: props.data.snapshot5,
              backgroundColor: 'indigo',
            },
            {
              label: 'Snapshot 7',
              data: props.data.snapshot6,
              backgroundColor: 'violet',
            },
          ],
        }}
        options={{
          scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] },
        }}
      />
    </div>
  );
};

export default BarGraph;
