import React, { useRef, useEffect, useState } from "react";
import visualsPackage from "../visualizer-styles";
// import { initDrops, animateDrops } from "../visualizer-styles/rain";

const ranNum = (max, min = 0) => Math.random() * (max - min) + min;

const init = (ctx, w, h, backgroundColor) => {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, w, h);
};

const Canvas = ({ audioData }) => {
  const ref = useRef();
  const [backgroundColor] = useState("rgb(0,0,0, 0.9)");

  useEffect(() => {
    let canvas = ref.current;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerHeight;
    ctx.canvas.height = window.innerHeight;

    let h;
    let w;

    const handleResize = () => {
      h = ctx.canvas.height = window.innerHeight;
      w = ctx.canvas.width = window.innerWidth;
      window.addEventListener("resize", handleResize);
    };
    handleResize();

    init(ctx, w, h, backgroundColor);

    ///package 1
    // visualsPackage.rain(ctx, w, h, audioData);
    // visualsPackage.bars(ctx, w, h, audioData, ranNum); // good

    //2
    // visualsPackage.explodingBass(ctx, w, h, audioData);
    // visualsPackage.bass(ctx, w, h, audioData, ranNum);

    //3
    //needs bigger fftsize
    visualsPackage.circleBars(ctx, w, h, audioData, ranNum);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return <canvas ref={ref} id="canvas" />;
};

export default Canvas;

// const animate = (ctx, w, h, audioData, ranNum) => {
//   const maxR = 150;

//   let max = Math.max(...audioData);
//   //   lastColor;
//   // ctx.fillStyle = `rgb(255,0,255
//   // , ${max / 255})`;
//   ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

//   let r = (max / 255) * maxR;

//   ctx.beginPath();
//   ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
//   ctx.fill();
//   hue += 0.05;
// };

// const init = (ctx, w, h) => {
//   ctx.clearRect(0, 0, w, h);
//   ctx.fillStyle = backgroundColor;
//   ctx.fillRect(0, 0, w, h);
// ctx.beginPath();
// ctx.arc(w / 2, h / 2, 50, 0, 2 * Math.PI);
// ctx.fillStyle = "rgb(255,255,255)";
// ctx.fill();
// };

// let rg = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, 1000);
// rg.addColorStop(0, "rgb(255,255,255)");
// rg.addColorStop(0.01, "rgb(120,120,120)");
// rg.addColorStop(1, "rgb(0,0,0)");
// ctx.fillStyle = rg;

// const animate = () => {
//   let x = 0;
//   const sliceWidth = w / audioData.length;
//   // id = window.requestAnimationFrame(animate);
//   ctx.clearRect(0, 0, w, h);

//   ctx.fillStyle = backgroundColor;
//   ctx.fillRect(0, 0, w, h);

//   // ctx.fillStyle = backgroundColor;
//   ctx.lineWidth = ranNum(5);
//   ctx.strokeStyle = `rgb(${ranNum(255)},${ranNum(255)},${ranNum(255)})`;
//   ctx.beginPath();
//   ctx.moveTo(0, h / 2);
//   for (const d of audioData) {
//     const y = (d / 255) * h;

//     ctx.lineTo(x, y);
//     x += sliceWidth;
//   }
//   ctx.lineTo(x, h / 2);
//   ctx.stroke();
// };
