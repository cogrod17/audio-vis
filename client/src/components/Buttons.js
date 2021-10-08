import React from "react";

const Buttons = ({ setVis }) => {
  const change = (e) => setVis(e.target.innerHTML);

  return (
    <div className="buttons-wrap">
      <div onClick={change} className="btn-one">
        1
      </div>
      <div onClick={change} className="btn-two">
        2
      </div>
      <div onClick={change} className="btn-three">
        3
      </div>
      <div onClick={change} className="btn-four">
        4
      </div>
    </div>
  );
};

export default Buttons;
