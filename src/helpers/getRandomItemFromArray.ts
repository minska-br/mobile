import randomIntFromInterval from "./randomIntFromInterval";

function getRandomItemFromArray(arr: Array<any>) {
  const maxIndex = arr.length - 1;
  const randomIndex = randomIntFromInterval(maxIndex);
  return arr[randomIndex];
}
export default getRandomItemFromArray;
