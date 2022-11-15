import {
  BoostPerformance,
} from "./src/BoostPerformance/Boostperformance";

const calcArray = [
  {
    calculateFn: () => {
      let sum = 0;
      for (let i = 0; i < 500; i++) {
        sum += i;
      }
      return sum;
    },
  },
  {
    calculateFn: () => {
      let sum = 0;
      for (let i = 0; i < 5000; i++) {
        sum += i;
      }
      return sum;
    },
  },
  {
    calculateFn: () => {
      let sum = 0;
      for (let i = 0; i < 11500; i++) {
        sum += i;
      }
      return sum;
    },
  },
];

const boostperformance = BoostPerformance.getInstance();
boostperformance.calculateInThreads(calcArray, (result: number[]) => {
  console.log("Hello");
  return result.reduce((acc, res)=> acc + res, 0)
});
