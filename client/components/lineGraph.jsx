import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph = props => {
  return (
    <div className="lineGraph">
      <Line
        data={{
          labels: props.labels,
          datasets: [
            {
              label: 'Heap Use Percentage',
              data: props.data.map(el =>
                ((el / props.heapSize) * 100).toFixed(2),
              ),
              heapUsageTotal: props.data,
              backgroundColor: 'rgba(75, 192, 192, 1)',
              borderColor: 'rgba(54, 145, 235, 1)',
              lineTension: 0,
              fill: false,
            },
          ],
        }}
        options={{
          title: {
            display: true,
            text: ` Heap Data Analysis`,
            fontSize: 32,
          },
          legend: {
            display: false,
            position: 'right',
            labels: {
              borderWidth: 1,
              fontColor: 'black',
            },
          },
          pointStyle: 'star',
          scales: {
            xAxes: [
              {
                ticks: {
                  suggestedMax: 60000,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Time (ms)',
                  fontSize: 24,
                },
                gridLines: {
                  display: true,
                  drawBorder: true,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  suggestedMin: 40,
                  suggestedMax: 60,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Memory Used Percentage (%)',
                  fontSize: 24,
                },
                gridLines: {
                  display: true,
                  drawBorder: true,
                },
              },
            ],
          },
          tooltips: {
            mode: 'label',
            callbacks: {
              title: function(tooltipItem, data) {
                return (
                  ' Total Heap Usage At ' +
                  data.labels[tooltipItem[0].index] / 1000 +
                  ' seconds'
                );
              },
              label: function(tooltipItem, data) {
                return (
                  'Total Heap Percentage Usage: ' +
                  data.datasets[tooltipItem.datasetIndex].data[
                    tooltipItem.index
                  ] +
                  '%'
                );
              },
              afterLabel: function(tooltipItem, data) {
                return (
                  'Total Heap Used: ' +
                  (
                    data.datasets[tooltipItem.datasetIndex].heapUsageTotal[
                      tooltipItem.index
                    ] / 1048576
                  ).toFixed(2) +
                  ' MB'
                );
              },
            },
            titleFontSize: 16,
            bodyFontSize: 16,
          },
          elements: {
            point: {
              pointStyle: 'rectRounded',
              radius: 10,
            },
          },
        }}
      />
    </div>
  );
};
export default LineGraph;
