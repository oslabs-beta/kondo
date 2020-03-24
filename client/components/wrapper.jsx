import React from 'react';
import LineGraph from './lineGraph';
// import ComparisonGraph from './comparisonGraph';

const Wrapper = props => {
  return (
    <div id="wrapper">
      <LineGraph
        labels={props.lineGraphLabels}
        data={props.lineGraphData}
        heapSize={props.heapTotalSize}
      />
    </div>
  );
};
export default Wrapper;
