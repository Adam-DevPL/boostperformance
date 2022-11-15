import { calculateInThreads } from "./src/BoostPerformance/Boostperformance";

const calcArray = [
  () => {
    let sum = 0;
    for(let i = 0; i < 500; i++) {
      sum += i;
    }
    return sum;
  }
];

calculateInThreads([], () => {console.log("Hello");});