export const bassRings = (ctx, w, h, audioData, ranNum) => {
  // ctx.fillStyle = `rgb(255,255,255, 0.9)`;
  const maxR = 300;

  let max = Math.max(...audioData);
  // console.log(max);
  let r = (max / 255) * maxR;

  ctx.lineWidth = 2;

  for (const d of audioData) {
    ctx.beginPath();
    ctx.strokeStyle = `rgb(${ranNum(255, 0)},${ranNum(200, 100)}, ${ranNum(
      255,
      0
    )})`;

    ctx.arc(w / 2, h / 2, d, 0, Math.PI * 2);
    ctx.stroke();
  }

  //   ctx.stroke();
};
