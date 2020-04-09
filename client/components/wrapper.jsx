import React from 'react';
import LineGraph from './lineGraph';
import BarGraph from './barGraph';

//props are being drilled from App.jsx
const Wrapper = props => {
  document.body.style.background = 'url(img-bw.jpg)';
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
