import randomFloatFromInterval from "./randomFloatFromInterval";

function fakeDelay(
  callback: Function,
  maxDelayinSeconds: number,
  minDelayinSeconds?: number
) {
  const fakeTimeout =
    randomFloatFromInterval(maxDelayinSeconds, minDelayinSeconds) * 1000;

  setTimeout(callback, fakeTimeout);
}

export default fakeDelay;
