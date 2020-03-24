import React from "react";
import { Line } from "react-chartjs-2";

const LineGraph = props => {
  return (
    <div className="lineGraph">
      <Line
        data={props.lineGraphData}
        options={{
          title: {
            display: true,
            text: ` Heap Data Analysis`,
            fontSize: 32
          },
          legend: {
            display: false,
            position: "right",
            labels: {
              borderWidth: 1,
              fontColor: "black"
            }
          },
          pointStyle: "star",
          scales: {
            xAxes: [
              {
                ticks: {
                  suggestedMax: 60000
                },
                scaleLabel: {
                  display: true,
                  labelString: "Time (ms)",
                  fontSize: 24
                },
                gridLines: {
                  display: true,
                  drawBorder: true
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 100
                },
                scaleLabel: {
                  display: true,
                  labelString: "Memory Used Percentage (%)",
                  fontSize: 24
                },
                gridLines: {
                  display: true,
                  drawBorder: true
                }
              }
            ]
          },
          tooltips: {
            mode: "label",
            callbacks: {
              title: function(tooltipItem, data) {
                return (
                  " Total Heap Usage At " +
                  data.labels[tooltipItem[0].index] / 1000 +
                  " seconds"
                );
              },
              beforeLabel: function(tooltipItem, data) {
                return (
                  "Total Heap Percentage Usage: " +
                  data.datasets[tooltipItem.datasetIndex].data[
                    tooltipItem.index
                  ]
                );
              },
              label: function(tooltipItem, data) {
                return (
                  "Total Heap Used (bits): " +
                  data.datasets[tooltipItem.datasetIndex].heapUsageTotal[
                    tooltipItem.index
                  ]
                );
              }
            },
            titleFontSize: 16,
            bodyFontSize: 16
          },
          elements: {
            point: {
              pointStyle: "rectRounded",
              radius: 10
            }
          }
        }}
      />
    </div>
  );
};

export default LineGraph;
