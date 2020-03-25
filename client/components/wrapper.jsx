import React from 'react';
import LineGraph from './lineGraph';
import ComparisonGraph from './barGraph';

const Wrapper = props => {
  return (
    <div id="wrapper">
      <LineGraph
        labels={props.lineGraphLabels}
        data={props.lineGraphData}
        heapSize={props.heapTotalSize}
      />
      <ComparisonGraph />
    </div>
  );
};
export default Wrapper;
