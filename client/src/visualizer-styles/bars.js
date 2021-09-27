export const bars = (ctx, w, h, audioData, ranNum) => {
  ctx.lineWidth = ranNum(5);
  const rectW = w / audioData.length - 5;
  let x = w;
  let hue = 0;

  for (const d of audioData) {
    const rectH = (d / 255) * h * 0.9;
    ctx.beginPath();
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

    ctx.rect(x, h - rectH, rectW, rectH);
    ctx.fill();

    x -= rectW + 5;
    hue += 10;
  }
};
