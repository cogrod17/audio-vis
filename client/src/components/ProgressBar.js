import React, { useState, useEffect } from "react";

const ProgressBar = ({ currentTime, duration, next }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // if (currentTime === duration) next();
    if (currentTime === duration && currentTime > 0) next();

    setWidth((currentTime / duration) * 100);
  }, [currentTime, duration]);

  return (
    <div id="progress-bar">
      <div style={{ width: `${width}%` }} id="time"></div>
    </div>
  );
};

export default ProgressBar;
