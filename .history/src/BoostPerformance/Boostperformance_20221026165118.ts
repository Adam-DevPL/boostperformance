import cluster from 'cluster';

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
    process.exit(0);
  }
};