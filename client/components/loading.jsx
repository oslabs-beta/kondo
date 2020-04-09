import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Loading = props => {
  const [analysisComplete, setLoadingStatus] = useState(false);

  useEffect(() => {
    $('body').ripples({ resolution: 256, refraction: 10, dropRadius: 60 });
    const textWrapper = document.querySelector('.ml9 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>",
    );

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

    fetch('/data')
      .then(res => res.json())
      .then(data => {
        props.updateState(data);
        setLoadingStatus(true);
      });
  });

  if (analysisComplete) {
    return <Redirect to="/analytics" />;
  }
  return (
    <div>
      <h1 class="ml9">
        <span class="text-wrapper">
          <span class="letters">Loading...</span>
        </span>
      </h1>
    </div>
  );
};

export default Loading;
