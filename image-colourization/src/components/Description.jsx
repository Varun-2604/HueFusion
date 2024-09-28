import React, { useState, useEffect } from 'react';
import TypeWriterEffect from 'react-typewriter-effect';

const colors = ['red', 'blue', 'green', 'purple', 'orange'];

export default function Description() {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="description">
      <h1 className="heading text-5xl font-bold mb-4 text-white" id="titl">HueFusion</h1>
      <p className="text-2xl font-semibold text-white" id="tex">
        Turn Your Black and White Images to{' '}
        <span className="inline-block" style={{ minWidth: '100px' }}>
          <TypeWriterEffect
            textStyle={{
              color: colors[colorIndex],
              fontWeight: 500,
              transition: 'color 0.5s ease',
            }}
            startDelay={100}
            cursorColor={colors[colorIndex]}
            text="Colours"
            typeSpeed={100}
            eraseSpeed={100}
            eraseDelay={1000}
            loop={true}
          />
        </span>
      </p>
    </div>
  );
}