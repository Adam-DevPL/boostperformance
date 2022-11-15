import cluster from "cluster";

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
    tasks.forEach((task) => {
      console.log(process.pid + " worker");
      const res = task;
      console.log(process.pid + "  " + res);
    });
    process.exit(0);
  }
};
