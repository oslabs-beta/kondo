import React from 'react';
import LineGraph from './lineGraph';
import BarGraph from './barGraph';

const Wrapper = props => {
  return (
    <div id="wrapper">
      <h1>Heap Analysis</h1>
      <LineGraph
        labels={props.lineGraphLabels}
        data={props.lineGraphData}
        heapSize={props.heapTotalSize}
      />
      <BarGraph
        labels={props.barGraphLabels}
        data={props.barGraphData}
        details={props.barGraphDetails}
      />
    </div>
  );
};
export default Wrapper;
