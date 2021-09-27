let hue = 0;

export const wavyLines = (ctx, w, h, audioData, ranNum, backgroundColor) => {
  let x = 0;
  // let hue = ranNum(360);

  const sliceWidth = w / audioData.length;

  // ctx.clearRect(0, 0, w, h);

  // ctx.fillStyle = backgroundColor;
  // ctx.fillRect(0, 0, w, h);

  ctx.lineWidth = ranNum(5);
  // ctx.strokeStyle = `rgb(${ranNum(255)},${ranNum(255)},${ranNum(255)})`;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(0, h / 2);

  for (const d of audioData) {
    const y = (d / 255) * h;
    ctx.lineTo(x, y);
    x += sliceWidth;
  }
  ctx.lineTo(x, h / 2);
  ctx.stroke();
  hue++;
};

// for (let i = 0; i < audioData.length; i++) {
// let lastY = (audioData[i - 1] / 255) * h;
// let lastX = x - sliceWidth;
// ctx.quadraticCurveTo(lastX, lastY, x, y);
