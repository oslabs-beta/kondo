import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Loading = props => {
  const [analysisComplete, setLoadingStatus] = useState(false);

  useEffect(() => {
    document.getElementById('body').style.backgroundColor = 'rgb(2, 2, 24)';
    fetch('/data')
      .then(res => res.json())
      .then(data => {
        console.log(data.memoryLeaks);
        props.updateState(data);
        setLoadingStatus(true);
      });
    return function cleanup() {
      document.getElementById('body').style.backgroundColor = '';
    };
  });

  const moveRipple = () => {
    const ripple = document.getElementsByClassName(
      'ball-scale-ripple-multiple',
    )[0];
    const newRipple = ripple.cloneNode(true);
    const w = document.documentElement.clientWidth;
    const h = document.documentElement.clientHeight;
    let width = Math.floor(Math.random() * w);
    let height = Math.floor(Math.random() * h);
    while (width < 300 || width > w - 300) {
      width = Math.floor(Math.random() * w);
    }
    while (height < 300 || height > h - 300) {
      height = Math.floor(Math.random() * h);
    }
    newRipple.style.left = width.toString() + 'px';
    newRipple.style.top = height.toString() + 'px';
    newRipple.firstChild.addEventListener('animationiteration', moveRipple);
    document.getElementById('pond').appendChild(newRipple);
    ripple.remove();
  };

  if (analysisComplete) {
    return <Redirect to="/analytics" />;
  }
  return (
    <div id="pond">
      <h1>Loading...</h1>
      <div className="ball-scale-ripple-multiple">
        <div onAnimationIteration={moveRipple} />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;
