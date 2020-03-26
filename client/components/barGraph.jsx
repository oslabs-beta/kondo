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
              backgroundColor: 'rgba(104,245,196,1)',
            },
            {
              label: 'Snapshot 2',
              data: props.data.snapshot1,
              backgroundColor: 'rgba(104,245,196,0.86)',
            },
            {
              label: 'Snapshot 3',
              data: props.data.snapshot2,
              backgroundColor: 'rgba(104,245,196,0.72)',
            },
            {
              label: 'Snapshot 4',
              data: props.data.snapshot3,
              backgroundColor: 'rgba(104,245,196,0.68)',
            },
            {
              label: 'Snapshot 5',
              data: props.data.snapshot4,
              backgroundColor: 'rgba(104,245,196,0.54)',
            },
            {
              label: 'Snapshot 6',
              data: props.data.snapshot5,
              backgroundColor: 'rgba(104,245,196,0.40)',
            },
            {
              label: 'Snapshot 7',
              data: props.data.snapshot6,
              backgroundColor: 'rgba(104,245,196,0.26)',
            },
          ],
        }}
        options={{
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }],
            tooltips: {
              mode: 'label',
              callbacks: {
                label: function(tooltipItem, data) {
                  return 'LABEL';
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BarGraph;
