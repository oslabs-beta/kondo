import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Loading = props => {
  const [analysisComplete, setLoadingStatus] = useState(false);

  useEffect(() => {
    if (!analysisComplete) {
      $('body').ripples({ resolution: 256, refraction: 10, dropRadius: 60 });

      anime
        .timeline({ loop: true })
        .add({
          targets: '.ml9 .letter',
          scale: [0, 1],
          duration: 1500,
          elasticity: 600,
          delay: (el, i) => 45 * (i + 1),
        })
        .add({
          targets: '.ml9',
          opacity: 0,
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 1000,
        });
    }
    fetch('/data')
      .then(res => res.json())
      .then(data => {
        props.updateState(data);
        $('body').ripples('hide');
        document.body.style.backgroundImage = 'none';
        setLoadingStatus(true);
      });
  });

  if (analysisComplete) {
    console.log('redirecting');
    return <Redirect to="/analytics" />;
  }
  return (
    <div>
      <h2 class="ml9">
        <span class="text-wrapper">
          <span class="letter">L</span>
          <span class="letter">o</span>
          <span class="letter">a</span>
          <span class="letter">d</span>
          <span class="letter">i</span>
          <span class="letter">n</span>
          <span class="letter">g</span>
          <span class="letter">.</span>
          <span class="letter">.</span>
          <span class="letter">.</span>
        </span>
      </h2>
    </div>
  );
};

export default Loading;
