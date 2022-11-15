import { calculateInThreads } from "./src/BoostPerformance/Boostperformance";

console.log("Hello");
calculateInThreads([], () => {console.log("Hello");});