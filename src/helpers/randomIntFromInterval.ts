import randomFloatFromInterval from "./randomFloatFromInterval";

/**
 * Min and max included.
 */
function randomIntFromInterval(max: number, min: number = 0) {
  return Math.floor(randomFloatFromInterval(max, min));
}

export default randomIntFromInterval;
