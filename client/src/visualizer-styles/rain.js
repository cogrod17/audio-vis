class Drop {
  constructor(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.velocity = Math.random() * 0.5;
    this.radius = 1;
    this.hue = 0; //
  }

  updateRain = (w, h, avgAudio) => {
    this.y += this.velocity;
    this.radius = (avgAudio / 255) * (Math.random() * 20) + 1;
    if (this.y >= h) {
      this.y = 0;
      this.x = Math.random() * w;
    }
  };

  changeColor = (hue) => {
    this.hue = hue;
  };

  grow = (w, h) => {
    this.radius += Math.random() * 0.25;
    if (this.radius >= 5) {
      this.radius = Math.random() * 5;
      this.x = Math.random() * w;
      this.y = Math.random() * h;
    }
  };

  draw = (ctx, w, h, avgAudio) => {
    if (avgAudio >= 120) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${this.hue}, 80%, 40%)`;
    ctx.fill();
  };
}

let dropArray = [];
let numberOfDrops = 100;
let init = false;

const initDrops = (w, h) => {
  if (init) return;

  for (let i = 0; i < numberOfDrops; i++) {
    dropArray.push(new Drop(w, h));
  }
  init = true;
};

export const animateDrops = (ctx, w, h, audioData) => {
  initDrops(w, h);

  let avg = audioData.length
    ? audioData.reduce((a, b) => a + b) / audioData.length
    : 0;
  let hue = Math.random() * 360;

  for (const drop of dropArray) {
    drop.updateRain(w, h, avg);
    drop.draw(ctx, w, h, avg);
    if (avg >= 130) {
      drop.changeColor(hue);
    }
  }
};
