const ranNum = (max, min = 0) => Math.random() * (max - min) + min;

class Pixel {
  constructor(w, h) {
    this.x = w / 2;
    this.y = h / 2;
    this.pathX = ranNum(1.5, -1.5);
    this.pathY = ranNum(1.5, -1.5);
    this.radius = Math.random() * 10;
    this.color = `hsl(${Math.random() * 300}, 100%, 50%)`;
  }

  update = (w, h, arr) => {
    this.x += this.pathX;
    this.y += this.pathY;

    if (
      this.x >= w ||
      this.x <= 0 ||
      this.y >= h ||
      this.y <= 0 ||
      this.radius <= 0.013
    ) {
      let index = arr.indexOf(this);
      arr.splice(index, 1);
    }
  };

  draw = (ctx) => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
}

const pixels = 1;
let arr = [];
let init = false;

const initPixels = (w, h) => {
  if (init) return;

  for (let i = 0; i < pixels; i++) {
    arr.push(new Pixel(w, h));
  }
  init = true;
};

const explode = (w, h) => {
  for (let i = 0; i < pixels; i++) {
    arr.push(new Pixel(w, h));
  }
};

export const explodingBass = (ctx, w, h, audioData) => {
  initPixels(w, h);

  let avg = audioData.length
    ? audioData.reduce((a, b) => a + b) / audioData.length
    : 0;

  if (avg >= 115) explode(w, h);

  for (const p of arr) {
    p.update(w, h, arr);
    p.draw(ctx);
  }
};
