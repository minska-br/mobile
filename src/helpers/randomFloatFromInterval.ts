/**
 * Min and max included.
 */
function randomFloatFromInterval(max: number, min: number = 0) {
  return Math.random() * (max - min + 1) + min;
}

export default randomFloatFromInterval;
