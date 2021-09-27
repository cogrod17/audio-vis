const ranNum = (max, min = 0) => Math.random() * (max - min) + min;

let hue = ranNum(360);

export const bassCircle = (ctx, w, h, audioData, ranNum) => {
  const maxR = 50;

  let max = Math.max(...audioData);

  ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

  let r = (max / 255) * maxR;

  ctx.beginPath();
  ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
  ctx.fill();
  hue += 0.05;
};
