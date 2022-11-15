import cluster from "cluster";

export class BoostPerformance {
  private forks = 4;
  private workers: any = [];
}

export const calculateInThreads = <T>(
  tasks: Array<{ calculateFn: () => T }>,
  whatDoWithCalculations: (results: Array<T>) => T
) => {
  const forks = 4;

  if (cluster.isPrimary) {
    console.log("I am primary");
    for (let i = 0; i < forks; i++) {
      cluster.fork();
    }
  } else {
    console.log(process.pid + " worker");

    tasks.forEach((task) => {
      const res = task.calculateFn();
      console.log(process.pid + "  " + res);
    });
    process.exit(0);
  }
};
