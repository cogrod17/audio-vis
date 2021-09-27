import { wavyLines } from "./wavyLines";
import { bassCircle } from "./bassCircle";
import { bassRings } from "./bassRings";
import { bars } from "./bars";
import { circleBars } from "./circleBars";
import { swirlingBars } from "./swirlingBars";
import { animateDrops, growDots } from "./rain";
import { explodingBass } from "../visualizer-styles/explodingBass";

const visualPackage = {
  waves: wavyLines,
  bass: bassCircle,
  rings: bassRings,
  bars,
  circleBars,
  swirlingBars,
  rain: animateDrops,
  growDots,
  explodingBass,
};

export default visualPackage;
