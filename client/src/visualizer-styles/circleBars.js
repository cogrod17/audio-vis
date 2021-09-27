export const circleBars = (ctx, w, h, audioData, ranNum) => {
  // ctx.translate(w / 2, h / 2);

  ctx.translate(w / 2, h / 2);

  let avg = audioData.length
    ? audioData.reduce((a, b) => a + b) / audioData.length
    : 0;

  const r = audioData.length ? (avg / 255) * 100 + 80 : 0;

  // const r = 150;
  // ctx.beginPath();
  // ctx.fillStyle = "rgb(255,255,255, 0.1)";
  // ctx.fillStyle = `hsl(0, 100%, 0%)`;
  // ctx.arc(0, 0, r, 0, Math.PI * 2);
  // ctx.fill();

  let { length } = audioData;
  let hue = 0;

  // console.log(length);
  const d = 0;
  // for (let i = 0; i < 360; i += 360 / audioData.length) {
  for (let i = 0; i < length; i++) {
    // let angle = i + (Math.PI * 2) / length;
    let barW = (2 * Math.PI * r * 12) / audioData.length;
    let barH = (audioData[i] / 255) * (h / 2); //**
    // let barH = avg; //

    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / 64);

    ctx.fillRect(r, -barW / 2, barH, barW);
    ctx.restore();
    // ctx.rotate(180);
    hue += 10;
  }
};
