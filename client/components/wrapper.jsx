import React from 'react';
import LineGraph from './lineGraph';
import BarGraph from './barGraph';

const Wrapper = props => {
  return (
    <div id="wrapper">
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
