import { bassCircle } from "./bassCircle";
import { bars } from "./bars";
import { circleBars } from "./circleBars";
import { animateDrops } from "./rain";
import { explodingBass } from "../visualizer-styles/explodingBass";

const visualPackage = {
  bass: bassCircle,
  bars,
  circleBars,
  rain: animateDrops,

  explodingBass,
};

export default visualPackage;
